import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import {
  brodsmule as brodsmulePt,
  motebehovReducerPt,
  motebehovSvarReducerPt,
  sykmeldt as sykmeldtPt,
} from '../propTypes';
import Side from './Side';
import AppSpinner from '../components/AppSpinner';
import Feilmelding from '../components/Feilmelding';
import MotebehovInnhold from '../components/dialogmoter/motebehov/MotebehovInnhold';
import { hentSykmeldte } from '../actions/sykmeldte_actions';
import { hentMotebehov, svarMotebehov } from '../actions/motebehov_actions';
import { hentMoter } from '../actions/moter_actions';
import { forsoektHentetSykmeldte } from '../utils/reducerUtils';
import { getReducerKey } from '../reducers/motebehov';
import {
  harBrukerSvartPaMotebehovINyesteOppfolgingstilfelle,
  skalViseMotebehovForSykmeldt,
} from '../utils/motebehovUtils';

const texts = {
  breadcrumbBase: 'Dine sykmeldte',
  titles: {
    meldBehov: 'Meld behov for møte',
    kvittering: 'Kvittering for møtebehov',
  },
};

const MotebehovSide = (props) => {
  const {
    henter,
    hentingFeilet,
    sendingFeilet,
    skalHenteMoter,
    skalHenteSykmeldte,
    skalViseMotebehov,
    narmestelederId,
    motebehov,
    motebehovSvarReducer,
    brodsmuler,
    sykmeldt,
  } = props;
  const dispatch = useDispatch();

  const doSvarMotebehov = (itValues, itSykmeldt) => {
    dispatch(svarMotebehov(itValues, itSykmeldt));
  };

  useEffect(() => {
    if (skalHenteMoter) {
      dispatch(hentMoter());
    }
    if (skalHenteSykmeldte) {
      dispatch(hentSykmeldte(narmestelederId));
    }
  });

  useEffect(() => {
    if (sykmeldt) {
      dispatch(hentMotebehov(sykmeldt));
    }
  }, [dispatch, sykmeldt]);

  const currentTitle = harBrukerSvartPaMotebehovINyesteOppfolgingstilfelle(motebehov)
    ? texts.titles.kvittering
    : texts.titles.meldBehov;

  return (
    <Side tittel={currentTitle} brodsmuler={[...brodsmuler, { tittel: currentTitle }]} laster={henter}>
      {(() => {
        if (henter) {
          return <AppSpinner />;
        } else if (hentingFeilet || sendingFeilet) {
          return <Feilmelding />;
        } else if (!skalViseMotebehov) {
          return (
            <Feilmelding
              tittel={'Møtebehovsiden er ikke tilgjengelig nå.'}
              melding={
                'Dette kan være fordi veilederen til den sykmeldte allerede har forespurt et møte, hvis ikke, prøv igjen senere.'
              }
            />
          );
        }
        return (
          <MotebehovInnhold
            svarMotebehov={doSvarMotebehov}
            sykmeldt={sykmeldt}
            motebehov={motebehov}
            motebehovSvarReducer={motebehovSvarReducer}
          />
        );
      })()}
    </Side>
  );
};
MotebehovSide.propTypes = {
  henter: PropTypes.bool,
  hentingFeilet: PropTypes.bool,
  sendingFeilet: PropTypes.bool,
  skalHenteMoter: PropTypes.bool,
  skalHenteSykmeldte: PropTypes.bool,
  skalViseMotebehov: PropTypes.bool,
  narmestelederId: PropTypes.string,
  brodsmuler: PropTypes.arrayOf(brodsmulePt),
  sykmeldt: sykmeldtPt,
  motebehov: motebehovReducerPt,
  motebehovSvarReducer: motebehovSvarReducerPt,
};

export function mapStateToProps(state, ownProps) {
  const narmestelederId = ownProps.match.params.narmestelederId;
  const sykmeldt = state.sykmeldte.data;

  let motebehov = { data: {} };
  let motebehovSvar = {};
  if (sykmeldt) {
    const motebehovReducerKey = getReducerKey(sykmeldt.fnr, sykmeldt.orgnummer);
    motebehov = state.motebehov[motebehovReducerKey] || motebehov;
    motebehovSvar = state.motebehovSvar[motebehovReducerKey] || motebehovSvar;
  }

  const skalViseMotebehov = skalViseMotebehovForSykmeldt(motebehov);
  const harForsoektHentetAlt =
    state.sykmeldte.hentingFeilet || (forsoektHentetSykmeldte(state.sykmeldte) && motebehov.hentingForsokt);
  return {
    henter: state.sykmeldte.henter || !harForsoektHentetAlt,
    hentingFeilet: motebehov.hentingFeilet || state.sykmeldte.hentingFeilet || !sykmeldt,
    sendingFeilet: motebehovSvar.sendingFeilet,
    skalHenteMoter: !state.moter.henter && !state.moter.hentet,
    skalHenteSykmeldte: !forsoektHentetSykmeldte(state.sykmeldte) && !state.sykmeldte.henter,
    skalViseMotebehov,
    narmestelederId,
    sykmeldt,
    motebehov,
    motebehovSvarReducer: motebehovSvar,
    brodsmuler: [
      {
        tittel: texts.breadcrumbBase,
        sti: '/arbeidsgiver/sykmeldte',
        erKlikkbar: true,
      },
      {
        tittel: sykmeldt ? sykmeldt.navn : '',
        sti: sykmeldt ? `/arbeidsgiver/sykmeldte/${narmestelederId}` : '/',
        erKlikkbar: true,
      },
      {
        tittel: 'Dialogmøter',
        sti: sykmeldt ? `/${sykmeldt.narmestelederId}` : '/',
        erKlikkbar: true,
      },
    ],
  };
}

const RootPage = (props) => {
  const ConnectedMotebehovSide = connect(mapStateToProps)(MotebehovSide);
  return <ConnectedMotebehovSide {...props} />;
};

RootPage.propTypes = {
  params: PropTypes.shape({
    narmestelederId: PropTypes.string,
  }),
};

export default RootPage;
