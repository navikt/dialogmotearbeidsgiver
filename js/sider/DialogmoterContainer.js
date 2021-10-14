import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Side from './Side';
import AppSpinner from '../components/AppSpinner';
import Feilmelding from '../components/Feilmelding';
import { hentMotebehov } from '../actions/motebehov_actions';
import { hentSykmeldte } from '../actions/sykmeldte_actions';
import { hentMoter } from '../actions/moter_actions';
import { brodsmule as brodsmulePt, motebehovReducerPt, sykmeldt as sykmeldtPt } from '../propTypes';
import { forsoektHentetSykmeldte } from '../utils/reducerUtils';
import { getMote } from '../utils/moteUtils';
import { skalViseMotebehovForSykmeldt } from '../utils/motebehovUtils';
import { getReducerKey } from '../reducers/motebehov';
import DialogmoterInnhold from '../components/dialogmoter/DialogmoterInnhold';

const texts = {
  brodsmuler: {
    dineSykmeldte: 'Dine sykmeldte',
    dialogmoter: 'Dialogmøter',
  },
  sideTittel: 'Dialogmøter',
};

class DialogmoterSide extends Component {
  componentDidMount() {
    const {
      actions,
      narmestelederId,
      sykmeldt,
      harForsoektHentetAlt,
      skalHenteMoter,
      skalHenteSykmeldte,
      skalViseMotebehov,
      history,
    } = this.props;
    actions.hentMotebehov(sykmeldt);
    if (harForsoektHentetAlt && skalViseMotebehov === false) {
      history.push(`${process.env.REACT_APP_CONTEXT_ROOT}/${narmestelederId}/mote`);
    }
    if (skalHenteMoter) {
      actions.hentMoter();
    }
    if (skalHenteSykmeldte) {
      actions.hentSykmeldte(narmestelederId);
    }
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(nextProps) {
    const { actions, narmestelederId } = this.props;
    const { sykmeldt, harForsoektHentetAlt } = nextProps;
    actions.hentMotebehov(sykmeldt);
    if (harForsoektHentetAlt && nextProps.skalViseMotebehov === false) {
      this.props.history.push(`${process.env.REACT_APP_CONTEXT_ROOT}/${narmestelederId}/mote`);
    }
  }

  render() {
    const {
      brodsmuler,
      henter,
      hentingFeilet,
      sykmeldt,
      motebehov,
      narmestelederId,
      harMote,
      skalViseMotebehov,
    } = this.props;
    return (
      <Side tittel={texts.sideTittel} brodsmuler={brodsmuler} laster={henter}>
        {(() => {
          if (henter) {
            return <AppSpinner />;
          } else if (hentingFeilet) {
            return <Feilmelding />;
          }
          return (
            <DialogmoterInnhold
              sykmeldt={sykmeldt}
              narmestelederId={narmestelederId}
              motebehov={motebehov}
              harMote={harMote}
              skalViseMotebehov={skalViseMotebehov}
            />
          );
        })()}
      </Side>
    );
  }
}

DialogmoterSide.propTypes = {
  henter: PropTypes.bool,
  hentingFeilet: PropTypes.bool,
  brodsmuler: PropTypes.arrayOf(brodsmulePt),
  narmestelederId: PropTypes.string,
  sykmeldt: sykmeldtPt,
  motebehov: motebehovReducerPt,
  harMote: PropTypes.bool,
  harForsoektHentetAlt: PropTypes.bool,
  skalHenteMoter: PropTypes.bool,
  skalHenteSykmeldte: PropTypes.bool,
  skalViseMotebehov: PropTypes.bool,
  actions: PropTypes.shape({
    hentMotebehov: PropTypes.func,
    hentMoter: PropTypes.func,
    hentSykmeldte: PropTypes.func,
  }),
  history: PropTypes.object.isRequired,
};

export function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators(
    {
      hentMotebehov,
      hentMoter,
      hentSykmeldte,
    },
    dispatch
  );

  return {
    actions,
  };
}

export function mapStateToProps(state, ownProps) {
  const narmestelederId = ownProps.match.params.narmestelederId;

  const sykmeldt = state.sykmeldte.data;

  let motebehov = { data: {} };
  if (sykmeldt) {
    const motebehovReducerKey = getReducerKey(sykmeldt.fnr, sykmeldt.orgnummer);
    motebehov = state.motebehov[motebehovReducerKey] || motebehov;
  }

  const harMote = (sykmeldt && getMote(state, sykmeldt.fnr)) !== undefined;
  const skalViseMotebehov = skalViseMotebehovForSykmeldt(motebehov);
  const harForsoektHentetAlt =
    state.sykmeldte.hentingFeilet ||
    (forsoektHentetSykmeldte(state.sykmeldte) && state.moter.hentingForsokt && motebehov.hentingForsokt);

  return {
    henter: state.sykmeldte.henter || !harForsoektHentetAlt,
    hentingFeilet: state.sykmeldte.hentingFeilet || (skalViseMotebehov && motebehov.hentingFeilet) || !sykmeldt,
    skalHenteMoter: !state.moter.hentingForsokt,
    skalHenteSykmeldte: !forsoektHentetSykmeldte(state.sykmeldte) && !state.sykmeldte.henter,
    narmestelederId,
    sykmeldt,
    motebehov,
    harMote,
    harForsoektHentetAlt,
    skalViseMotebehov,
    brodsmuler: [
      {
        tittel: texts.brodsmuler.dineSykmeldte,
        sti: '/sykefravaerarbeidsgiver',
        erKlikkbar: true,
      },
      {
        tittel: sykmeldt ? sykmeldt.navn : '',
        sti: sykmeldt ? `/sykefravaerarbeidsgiver/${sykmeldt.narmestelederId}` : '/',
        erKlikkbar: true,
      },
      {
        tittel: texts.brodsmuler.dialogmoter,
      },
    ],
  };
}

const RootPage = (props) => {
  const DialogmoterContainer = connect(mapStateToProps, mapDispatchToProps)(DialogmoterSide);
  return <DialogmoterContainer {...props} />;
};

RootPage.propTypes = {
  params: PropTypes.shape({
    narmestelederId: PropTypes.string,
  }),
};

export default withRouter(RootPage);
