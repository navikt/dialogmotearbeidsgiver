import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Side from './Side';
import AppSpinner from '../components/AppSpinner';
import Feilmelding from '../components/Feilmelding';
import AvbruttMote from '../components/dialogmoter/dialogmoteplanlegger/AvbruttMote';
import BekreftetKvittering from '../components/dialogmoter/dialogmoteplanlegger/BekreftetKvittering';
import Kvittering from '../components/dialogmoter/dialogmoteplanlegger/Kvittering';
import MotePassert from '../components/dialogmoter/dialogmoteplanlegger/MotePassert';
import Svarside from '../components/dialogmoter/dialogmoteplanlegger/Svarside';
import { AVBRUTT, BEKREFTET, getSvarsideModus, MOTESTATUS, SKJEMA } from '../utils/moteplanleggerUtils';
import { hentMoter, sendSvar } from '../actions/moter_actions';
import { hentMotebehov } from '../actions/motebehov_actions';
import { hentSykmeldte } from '../actions/sykmeldte_actions';
import { erMotePassert, getMote } from '../utils/moteUtils';
import { brodsmule as brodsmulePt, motePt, sykmeldt as sykemeldtPt } from '../propTypes';
import { getReducerKey } from '../reducers/motebehov';
import { forsoektHentetSykmeldte } from '../utils/reducerUtils';

const texts = {
  titles: {
    tidspunkt: 'Tidspunkt for dialogmøte',
    svart: 'Svaret ditt på tidspunkt for dialogmøte',
    bekreftet: 'Møtebekreftelse',
  },
  breadcrumbBase: 'Dine sykmeldte',
  errorNoMeetingFound: {
    title: 'Du har ingen møteforespørsel',
    message: 'Er du sikker på at du er på riktig side?',
  },
};

const getTitleFromModus = (modus) => {
  const titles = texts.titles;
  switch (modus) {
    case SKJEMA:
    case AVBRUTT:
      return titles.tidspunkt;
    case MOTESTATUS:
      return titles.svart;
    case BEKREFTET:
      return titles.bekreftet;
    default:
      return titles.tidspunkt;
  }
};

export const DialogmoteSideComponent = (props) => {
  const {
    brodsmuler,
    mote,
    moteIkkeFunnet,
    henter,
    hentingFeilet,
    doHentMotebehov,
    doHentMoter,
    doHentSykmeldte,
    skalHenteMoter,
    skalHenteSykmeldte,
    sykmeldt,
    narmestelederId,
  } = props;
  const modus = getSvarsideModus(mote);
  const title = getTitleFromModus(modus);

  useEffect(() => {
    if (skalHenteMoter) {
      doHentMoter();
    }
    if (skalHenteSykmeldte) {
      doHentSykmeldte(narmestelederId);
    }
    doHentMotebehov(sykmeldt);
  });

  useEffect(() => {
    if (sykmeldt) {
      doHentMotebehov(sykmeldt);
    }
  }, [doHentMotebehov, sykmeldt]);

  return (
    <Side tittel={title} brodsmuler={[...brodsmuler, { tittel: title }]} laster={henter}>
      {(() => {
        if (henter) {
          return <AppSpinner />;
        }
        if (hentingFeilet) {
          return <Feilmelding />;
        }
        if (moteIkkeFunnet) {
          return <Feilmelding tittel={texts.errorNoMeetingFound.title} melding={texts.errorNoMeetingFound.message} />;
        }
        if (erMotePassert(mote)) {
          return <MotePassert />;
        }
        if (modus === BEKREFTET) {
          return <BekreftetKvittering mote={mote} />;
        }
        if (modus === MOTESTATUS) {
          return <Kvittering mote={mote} />;
        }
        if (modus === AVBRUTT) {
          return <AvbruttMote mote={mote} />;
        }
        if (mote) {
          return <Svarside {...props} />;
        }
        return <Feilmelding />;
      })()}
    </Side>
  );
};

DialogmoteSideComponent.propTypes = {
  henter: PropTypes.bool,
  hentingFeilet: PropTypes.bool,
  mote: motePt,
  doHentMotebehov: PropTypes.func,
  doHentMoter: PropTypes.func,
  doHentSykmeldte: PropTypes.func,
  brodsmuler: PropTypes.arrayOf(brodsmulePt),
  moteIkkeFunnet: PropTypes.bool,
  narmestelederId: PropTypes.string,
  skalHenteMoter: PropTypes.bool,
  skalHenteSykmeldte: PropTypes.bool,
  sykmeldt: sykemeldtPt,
};

export function mapStateToProps(state, ownProps) {
  const narmestelederId = ownProps.match.params.narmestelederId;

  const sykmeldt = state.sykmeldte.data;

  let motebehovReducer = state.motebehov;

  if (sykmeldt) {
    const motebehovReducerKey = getReducerKey(sykmeldt.fnr, sykmeldt.orgnummer);
    motebehovReducer = state.motebehov[motebehovReducerKey] || motebehovReducer;
  }

  const harForsoektHentetAlt =
    state.sykmeldte.hentingFeilet ||
    (forsoektHentetSykmeldte(state.sykmeldte) && state.moter.hentingForsokt && motebehovReducer.hentingForsokt);

  return {
    henter: !harForsoektHentetAlt,
    hentingFeilet:
      state.sykmeldte.hentingFeilet || state.moter.hentingFeilet || motebehovReducer.hentingFeilet || !sykmeldt,
    skalHenteMoter: !state.moter.henter && !state.moter.hentet,
    skalHenteSykmeldte: !forsoektHentetSykmeldte(state.sykmeldte) && !state.sykmeldte.henter,
    mote: sykmeldt && getMote(state, sykmeldt.fnr),
    sender: state.svar.sender === true,
    sendingFeilet: state.svar.sendingFeilet === true,
    moteIkkeFunnet: !sykmeldt || getMote(state, sykmeldt.fnr) === null,
    narmestelederId,
    motebehovReducer,
    sykmeldt,
    brodsmuler: [
      {
        tittel: texts.breadcrumbBase,
        sti: '/sykefravaerarbeidsgiver',
        erKlikkbar: true,
      },
      {
        tittel: sykmeldt ? sykmeldt.navn : '',
        sti: sykmeldt ? `/arbeidsgiver/sykmeldte/${sykmeldt.narmestelederId}` : '/',
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
  const ConnectedSide = connect(mapStateToProps, {
    sendSvar,
    doHentMotebehov: hentMotebehov,
    doHentMoter: hentMoter,
    doHentSykmeldte: hentSykmeldte,
  })(DialogmoteSideComponent);
  return <ConnectedSide {...props} />;
};

RootPage.propTypes = {
  params: PropTypes.shape({
    narmestelederId: PropTypes.string,
  }),
};

export default RootPage;
