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
import { AVBRUTT, BEKREFTET, MOTESTATUS, SKJEMA, getSvarsideModus } from '../utils/moteplanleggerUtils';
import { hentMoter, sendSvar } from '../actions/moter_actions';
import { hentMotebehov } from '../actions/motebehov_actions';
import { hentSykmeldte, hentSykmeldteBerikelser } from '../actions/sykmeldte_actions';
import { erMotePassert, getMote } from '../utils/moteUtils';
import { brodsmule as brodsmulePt, motePt, sykmeldt as sykemeldtPt } from '../propTypes';
import { getReducerKey } from '../reducers/motebehov';
import { beregnSkalHenteSykmeldtBerikelse } from '../utils/sykmeldtUtils';
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
    doHentSykmeldteBerikelser,
    skalHenteBerikelse,
    skalHenteMoter,
    skalHenteSykmeldte,
    sykmeldt,
  } = props;
  const modus = getSvarsideModus(mote);
  const title = getTitleFromModus(modus);

  useEffect(() => {
    if (skalHenteMoter) {
      doHentMoter();
    }
    if (skalHenteSykmeldte) {
      doHentSykmeldte();
    }
    doHentMotebehov(sykmeldt);
  });

  useEffect(() => {
    if (sykmeldt) {
      doHentMotebehov(sykmeldt);
      if (skalHenteBerikelse) {
        doHentSykmeldteBerikelser([sykmeldt.koblingId]);
      }
    }
  }, [sykmeldt]);

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
  doHentSykmeldteBerikelser: PropTypes.func,
  brodsmuler: PropTypes.arrayOf(brodsmulePt),
  moteIkkeFunnet: PropTypes.bool,
  skalHenteBerikelse: PropTypes.bool,
  skalHenteMoter: PropTypes.bool,
  skalHenteSykmeldte: PropTypes.bool,
  sykmeldt: sykemeldtPt,
};

export function mapStateToProps(state, ownProps) {
  const koblingId = ownProps.params.koblingId;

  const sykmeldt =
    state.sykmeldte && state.sykmeldte.data
      ? state.sykmeldte.data.filter((s) => {
          return `${s.koblingId}` === koblingId;
        })[0]
      : {};

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
    skalHenteBerikelse: beregnSkalHenteSykmeldtBerikelse(sykmeldt, state),
    skalHenteMoter: !state.moter.henter && !state.moter.hentet,
    skalHenteSykmeldte: !forsoektHentetSykmeldte(state.sykmeldte) && !state.sykmeldte.henter,
    mote: sykmeldt && getMote(state, sykmeldt.fnr),
    sender: state.svar.sender === true,
    sendingFeilet: state.svar.sendingFeilet === true,
    moteIkkeFunnet: !sykmeldt || getMote(state, sykmeldt.fnr) === null,
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
        sti: sykmeldt ? `/sykefravaerarbeidsgiver/${sykmeldt.koblingId}` : '/',
        erKlikkbar: true,
      },
      {
        tittel: 'Dialogmøter',
        sti: sykmeldt ? `/${sykmeldt.koblingId}` : '/',
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
    doHentSykmeldteBerikelser: hentSykmeldteBerikelser,
  })(DialogmoteSideComponent);
  return <ConnectedSide {...props} />;
};

RootPage.propTypes = {
  params: PropTypes.shape({
    koblingId: PropTypes.string,
  }),
};

export default RootPage;
