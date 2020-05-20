import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import history from '../history';
import Side from './Side';
import AppSpinner from '../components/AppSpinner';
import Feilmelding from '../components/Feilmelding';
import BerikSykmeldtContainer from '../containers/BerikSykmeldtContainer';
import { hentMotebehov } from '../actions/motebehov_actions';
import {
    hentSykmeldte,
    hentSykmeldteBerikelser,
} from '../actions/sykmeldte_actions';
import { hentMoter } from '../actions/moter_actions';
import {
    brodsmule as brodsmulePt,
    sykmeldt as sykmeldtPt,
    motebehovReducerPt,
} from '../propTypes';
import { forsoektHentetSykmeldte } from '../utils/reducerUtils';
import { getMote } from '../utils/moteUtils';
import { skalViseMotebehovForSykmeldt } from '../utils/motebehovUtils';
import { getReducerKey } from '../reducers/motebehov';
import DialogmoterInnhold from '../components/dialogmoter/DialogmoterInnhold';
import { beregnSkalHenteSykmeldtBerikelse } from '../utils/sykmeldtUtils';

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
            koblingId,
            sykmeldt,
            harForsoektHentetAlt,
            skalHenteBerikelse,
            skalHenteMoter,
            skalHenteSykmeldte,
            skalViseMotebehov,
        } = this.props;
        actions.hentMotebehov(sykmeldt);
        if (harForsoektHentetAlt && skalViseMotebehov === false) {
            history.push(`${process.env.REACT_APP_CONTEXT_ROOT}/${koblingId}/mote`);
        }
        if (skalHenteMoter) {
            actions.hentMoter();
        }
        if (skalHenteSykmeldte) {
            actions.hentSykmeldte();
        }
        if (sykmeldt && skalHenteBerikelse) {
            actions.hentSykmeldteBerikelser([sykmeldt.koblingId]);
        }
    }

    componentWillReceiveProps(nextProps) {
        const {
            actions,
            koblingId,
        } = this.props;
        const {
            sykmeldt,
            harForsoektHentetAlt,
        } = nextProps;
        actions.hentMotebehov(sykmeldt);
        if (harForsoektHentetAlt && nextProps.skalViseMotebehov === false) {
            history.push(`${process.env.REACT_APP_CONTEXT_ROOT}/${koblingId}/mote`);
        }
    }

    render() {
        const {
            brodsmuler,
            henter,
            hentingFeilet,
            sykmeldt,
            motebehov,
            koblingId,
            harMote,
            skalViseMotebehov,
        } = this.props;
        return (<Side
            tittel={texts.sideTittel}
            brodsmuler={brodsmuler}
            laster={henter}>
            <BerikSykmeldtContainer koblingId={sykmeldt ? sykmeldt.koblingId : null}>
                {
                    (() => {
                        if (henter) {
                            return <AppSpinner />;
                        } else if (hentingFeilet) {
                            return <Feilmelding />;
                        }
                        return (<DialogmoterInnhold
                            sykmeldt={sykmeldt}
                            koblingId={koblingId}
                            motebehov={motebehov}
                            harMote={harMote}
                            skalViseMotebehov={skalViseMotebehov}
                        />);
                    })()
                }
            </BerikSykmeldtContainer>
        </Side>);
    }
}

DialogmoterSide.propTypes = {
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    brodsmuler: PropTypes.arrayOf(brodsmulePt),
    koblingId: PropTypes.string,
    sykmeldt: sykmeldtPt,
    motebehov: motebehovReducerPt,
    harMote: PropTypes.bool,
    harForsoektHentetAlt: PropTypes.bool,
    skalHenteBerikelse: PropTypes.bool,
    skalHenteMoter: PropTypes.bool,
    skalHenteSykmeldte: PropTypes.bool,
    skalViseMotebehov: PropTypes.bool,
    actions: PropTypes.shape({
        hentMotebehov: PropTypes.func,
    }),
};

export function mapDispatchToProps(dispatch) {
    const actions = bindActionCreators({
        hentMotebehov,
        hentMoter,
        hentSykmeldte,
        hentSykmeldteBerikelser,
    }, dispatch);

    return {
        actions,
    };
}

export function mapStateToProps(state, ownProps) {
    const koblingId = ownProps.params.koblingId;

    const sykmeldt = state.sykmeldte && state.sykmeldte.data ? state.sykmeldte.data.find((s) => {
        return `${s.koblingId}` === koblingId;
    }) : {};

    let motebehov = { data: {} };
    if (sykmeldt) {
        const motebehovReducerKey = getReducerKey(sykmeldt.fnr, sykmeldt.orgnummer);
        motebehov = state.motebehov[motebehovReducerKey] || motebehov;
    }

    const harMote = sykmeldt
    && getMote(state, sykmeldt.fnr);
    const skalViseMotebehov = skalViseMotebehovForSykmeldt(motebehov);
    const harForsoektHentetAlt = forsoektHentetSykmeldte(state.sykmeldte)
        && state.moter.hentingForsokt
        && motebehov.hentingForsokt;

    return {
        henter: state.sykmeldte.henter
            || state.sykmeldte.henterBerikelser.length > 0
            || !harForsoektHentetAlt,
        hentingFeilet: state.sykmeldte.hentingFeilet
            || (skalViseMotebehov && motebehov.hentingFeilet)
            || !sykmeldt,
        skalHenteBerikelse: beregnSkalHenteSykmeldtBerikelse(sykmeldt, state),
        skalHenteMoter: !state.moter.hentingForsokt,
        skalHenteSykmeldte: !forsoektHentetSykmeldte(state.sykmeldte) && !state.sykmeldte.henter,
        koblingId,
        sykmeldt,
        motebehov,
        harMote,
        harForsoektHentetAlt,
        skalViseMotebehov,
        brodsmuler: [{
            tittel: texts.brodsmuler.dineSykmeldte,
            sti: '/sykefravaerarbeidsgiver',
            erKlikkbar: true,
        }, {
            tittel: sykmeldt ? sykmeldt.navn : '',
            sti: sykmeldt ? `/sykefravaerarbeidsgiver/${sykmeldt.koblingId}` : '/',
            erKlikkbar: true,
        }, {
            tittel: texts.brodsmuler.dialogmoter,
        }],
    };
}

const RootPage = (props) => {
    const DialogmoterContainer = connect(mapStateToProps, mapDispatchToProps)(DialogmoterSide);
    return <DialogmoterContainer {...props} />;
};

RootPage.propTypes = {
    params: PropTypes.shape({
        koblingId: PropTypes.string,
    }),
};

export default RootPage;
