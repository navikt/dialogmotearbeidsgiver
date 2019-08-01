import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    getLedetekst,
    hentSykeforlopsPerioder,
    sykeforlopsPerioderReducerPt,
} from '@navikt/digisyfo-npm';
import {
    brodsmule as brodsmulePt,
    sykmeldt as sykmeldtPt,
    motebehovReducerPt,
    motebehovSvarReducerPt,
} from '../propTypes';
import Side from './Side';
import AppSpinner from '../components/AppSpinner';
import Feilmelding from '../components/Feilmelding';
import BerikSykmeldtContainer from '../containers/BerikSykmeldtContainer';
import InnholdslasterContainer from '../containers/InnholdslasterContainer';
import MotebehovInnhold from '../components/dialogmoter/MotebehovInnhold';
import {
    hentMotebehov,
    svarMotebehov,
} from '../actions/motebehov_actions';
import { hentMoter } from '../actions/moter_actions';
import { forsoektHentetSykmeldte } from '../utils/reducerUtils';
import {
    finnSykmeldtsSykeforlopsPeriode,
    forsoektHentetSykmeldtsSykeforlopsPerioder,
    henterEllerHarForsoektHentetSykmeldtsSykeforlopsPerioder,
} from '../utils/sykeforloepsperioderUtils';
import { getReducerKey } from '../reducers/motebehov';
import {
    getMote,
    skalViseMotebehovForSykmeldt,
} from '../utils/moteUtils';

class MotebehovSide extends Component {
    componentDidMount() {
        const {
            actions,
            sykmeldt,
            skalHenteSykeforloepsPerioder,
            skalHenteMoter,
        } = this.props;
        actions.hentMotebehov(sykmeldt);
        if (skalHenteSykeforloepsPerioder) {
            actions.hentSykeforlopsPerioder(sykmeldt.fnr, sykmeldt.orgnummer);
        }
        if (skalHenteMoter) {
            actions.hentMoter();
        }
    }

    componentWillReceiveProps(nextProps) {
        const {
            actions,
        } = this.props;
        const {
            sykmeldt,
            skalHenteSykeforloepsPerioder,
        } = nextProps;
        actions.hentMotebehov(sykmeldt);
        if (!this.props.skalHenteSykeforloepsPerioder && skalHenteSykeforloepsPerioder) {
            actions.hentSykeforlopsPerioder(sykmeldt.fnr, sykmeldt.orgnummer);
        }
    }

    render() {
        const {
            henter,
            hentingFeilet,
            sendingFeilet,
            skalViseMotebehov,
            brodsmuler,
            sykmeldt,
        } = this.props;
        return (<Side
            tittel={getLedetekst('mote.behov.sidetittel')}
            brodsmuler={brodsmuler}
            laster={henter}>
            <BerikSykmeldtContainer koblingId={sykmeldt ? sykmeldt.koblingId : null}>
                {
                    (() => {
                        if (henter) {
                            return <AppSpinner />;
                        } else if (hentingFeilet || sendingFeilet) {
                            return <Feilmelding />;
                        } else if (!skalViseMotebehov) {
                            return (<Feilmelding
                                tittel={'Møtebehovsiden er ikke tilgjengelig nå.'}
                                melding={'Dette kan være fordi veilederen til den sykmeldte allerede har forespurt et møte, hvis ikke, prøv igjen senere.'}
                            />);
                        }
                        return (<MotebehovInnhold
                            {...this.props}
                        />);
                    })()
                }
            </BerikSykmeldtContainer>
        </Side>);
    }
}
MotebehovSide.propTypes = {
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    sendingFeilet: PropTypes.bool,
    skalHenteMoter: PropTypes.bool,
    skalHenteSykeforloepsPerioder: PropTypes.bool,
    skalViseMotebehov: PropTypes.bool,
    actions: PropTypes.shape({
        hentMotebehov: PropTypes.func,
        hentMoter: PropTypes.func,
        svarMotebehov: PropTypes.func,
        hentSykeforlopsPerioder: PropTypes.func,
    }),
    brodsmuler: PropTypes.arrayOf(brodsmulePt),
    sykeforlopsPerioder: sykeforlopsPerioderReducerPt,
    sykmeldt: sykmeldtPt,
    motebehov: motebehovReducerPt,
    motebehovSvarReducer: motebehovSvarReducerPt,
};

export function mapDispatchToProps(dispatch) {
    const actions = bindActionCreators({
        hentMotebehov,
        svarMotebehov,
        hentSykeforlopsPerioder,
        hentMoter,
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

    let motebehov = { data: [] };
    let motebehovSvar = {};
    let sykeforlopsPerioder = {};
    let skalHenteSykeforloepsPerioder = false;
    let moteForSykmeldt = {};
    if (sykmeldt) {
        const motebehovReducerKey = getReducerKey(sykmeldt.fnr, sykmeldt.orgnummer);
        motebehov = state.motebehov[motebehovReducerKey] || motebehov;
        motebehovSvar = state.motebehovSvar[motebehovReducerKey] || motebehovSvar;
        sykeforlopsPerioder = finnSykmeldtsSykeforlopsPeriode(sykmeldt, state.sykeforlopsPerioder);
        skalHenteSykeforloepsPerioder = (sykmeldt.fnr && sykmeldt.fnr !== '' && !henterEllerHarForsoektHentetSykmeldtsSykeforlopsPerioder(sykeforlopsPerioder)) || false;
        moteForSykmeldt = getMote(state, sykmeldt.fnr);
    }

    const skalViseMotebehov = skalViseMotebehovForSykmeldt(sykmeldt, sykeforlopsPerioder, motebehov, moteForSykmeldt);
    const harForsoektHentetAlt = forsoektHentetSykmeldtsSykeforlopsPerioder(sykeforlopsPerioder)
        && forsoektHentetSykmeldte(state.sykmeldte)
        && (!skalViseMotebehov || motebehov.hentingForsokt);

    return {
        henter: state.ledetekster.henter
        || state.sykmeldte.henter
        || state.sykmeldte.henterBerikelser.length > 0
        || sykeforlopsPerioder.henter
        || !harForsoektHentetAlt,
        hentingFeilet: state.ledetekster.hentingFeilet
        || motebehov.hentingFeilet
        || state.sykmeldte.hentingFeilet
        || sykeforlopsPerioder.hentingFeilet
        || !sykmeldt,
        sendingFeilet: motebehovSvar.sendingFeilet,
        skalHenteMoter: !state.moter.henter && !state.moter.hentet,
        skalHenteSykeforloepsPerioder,
        skalViseMotebehov,
        ledetekster: state.ledetekster.data,
        sykeforlopsPerioder,
        sykmeldt,
        motebehov,
        motebehovSvarReducer: motebehovSvar,
        brodsmuler: [{
            tittel: getLedetekst('sykefravaerarbeidsgiver.dinesykmeldte.sidetittel'),
            sti: '/sykefravaerarbeidsgiver',
            erKlikkbar: true,
        }, {
            tittel: sykmeldt ? sykmeldt.navn : '',
            sti: sykmeldt ? `/sykefravaerarbeidsgiver/${sykmeldt.koblingId}` : '/',
            erKlikkbar: true,
        }, {
            tittel: getLedetekst('mote.sidetittel'),
        }],
    };
}

const ConnectedMotebehovSide = connect(mapStateToProps, mapDispatchToProps)(MotebehovSide);

const MotebehovContainerMedInnholdlaster = (props) => {
    const { params } = props;
    return (<InnholdslasterContainer
        koblingIder={[params.koblingId]}
        avhengigheter={[]}
        render={(meta) => {
            return <ConnectedMotebehovSide {...props} meta={meta} />;
        }} />);
};

MotebehovContainerMedInnholdlaster.propTypes = {
    params: PropTypes.shape({
        koblingId: PropTypes.string,
    }),
};

export default MotebehovContainerMedInnholdlaster;
