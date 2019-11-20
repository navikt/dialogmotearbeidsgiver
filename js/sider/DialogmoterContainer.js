import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    getLedetekst,
    hentSykeforlopsPerioder,
    sykeforlopsPerioderReducerPt,
} from '@navikt/digisyfo-npm';
import history from '../history';
import Side from './Side';
import AppSpinner from '../components/AppSpinner';
import Feilmelding from '../components/Feilmelding';
import BerikSykmeldtContainer from '../containers/BerikSykmeldtContainer';
import InnholdslasterContainer, { MOTER } from '../containers/InnholdslasterContainer';
import { hentMotebehov } from '../actions/motebehov_actions';
import {
    brodsmule as brodsmulePt,
    sykmeldt as sykmeldtPt,
    motebehovReducerPt,
} from '../propTypes';
import { forsoektHentetSykmeldte } from '../utils/reducerUtils';
import {
    getMote,
    skalViseMotebehovForSykmeldt,
} from '../utils/moteUtils';
import {
    finnSykmeldtsSykeforlopsPeriode,
    forsoektHentetSykmeldtsSykeforlopsPerioder,
    henterEllerHarForsoektHentetSykmeldtsSykeforlopsPerioder,
} from '../utils/sykeforloepsperioderUtils';
import { getReducerKey } from '../reducers/motebehov';
import DialogmoterInnhold from '../components/dialogmoter/DialogmoterInnhold';

class DialogmoterSide extends Component {
    componentDidMount() {
        const {
            actions,
            koblingId,
            sykmeldt,
            harForsoektHentetAlt,
            skalHenteSykeforloepsPerioder,
            skalViseMotebehov,
        } = this.props;
        actions.hentMotebehov(sykmeldt);
        if (skalHenteSykeforloepsPerioder) {
            actions.hentSykeforlopsPerioder(sykmeldt.fnr, sykmeldt.orgnummer);
        }
        if (harForsoektHentetAlt && skalViseMotebehov === false) {
            history.push(`${process.env.REACT_APP_CONTEXT_ROOT}/${koblingId}/mote`);
        }
    }

    componentWillReceiveProps(nextProps) {
        const {
            actions,
            koblingId,
        } = this.props;
        const {
            sykmeldt,
            skalHenteSykeforloepsPerioder,
            harForsoektHentetAlt,
        } = nextProps;
        actions.hentMotebehov(sykmeldt);
        if (!this.props.skalHenteSykeforloepsPerioder && skalHenteSykeforloepsPerioder) {
            actions.hentSykeforlopsPerioder(sykmeldt.fnr, sykmeldt.orgnummer);
        }
        if (harForsoektHentetAlt && nextProps.skalViseMotebehov === false) {
            history.push(`${process.env.REACT_APP_CONTEXT_ROOT}/${koblingId}/mote`);
        }
    }

    render() {
        const {
            brodsmuler,
            henter,
            hentingFeilet,
            sykeforlopsPerioder,
            sykmeldt,
            motebehov,
            koblingId,
            harMote,
            skalViseMotebehov,
        } = this.props;
        return (<Side
            tittel={getLedetekst('mote.moter.sidetittel')}
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
                            koblingId={koblingId}
                            motebehov={motebehov}
                            sykeforlopsPerioder={sykeforlopsPerioder}
                            sykmeldt={sykmeldt}
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
    sykeforlopsPerioder: sykeforlopsPerioderReducerPt,
    sykmeldt: sykmeldtPt,
    motebehov: motebehovReducerPt,
    harMote: PropTypes.bool,
    harForsoektHentetAlt: PropTypes.bool,
    skalHenteSykeforloepsPerioder: PropTypes.bool,
    skalViseMotebehov: PropTypes.bool,
    actions: PropTypes.shape({
        hentMotebehov: PropTypes.func,
        hentSykeforlopsPerioder: PropTypes.func,
    }),
};

export function mapDispatchToProps(dispatch) {
    const actions = bindActionCreators({
        hentMotebehov,
        hentSykeforlopsPerioder,
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
    let sykeforlopsPerioder = {};
    let skalHenteSykeforloepsPerioder = false;
    let moteForSykmeldt = {};
    if (sykmeldt) {
        const motebehovReducerKey = getReducerKey(sykmeldt.fnr, sykmeldt.orgnummer);
        motebehov = state.motebehov[motebehovReducerKey] || motebehov;
        sykeforlopsPerioder = finnSykmeldtsSykeforlopsPeriode(sykmeldt, state.sykeforlopsPerioder);
        skalHenteSykeforloepsPerioder = (sykmeldt.fnr && sykmeldt.fnr !== '' && !henterEllerHarForsoektHentetSykmeldtsSykeforlopsPerioder(sykeforlopsPerioder)) || false;
        moteForSykmeldt = getMote(state, sykmeldt.fnr);
    }

    const harMote = sykmeldt
    && getMote(state, sykmeldt.fnr);
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
        hentingFeilet: state.sykmeldte.hentingFeilet
            || sykeforlopsPerioder.hentingFeilet
            || (skalViseMotebehov && motebehov.hentingFeilet)
            || !sykmeldt,
        koblingId,
        sykeforlopsPerioder,
        sykmeldt,
        motebehov,
        harMote,
        harForsoektHentetAlt,
        skalHenteSykeforloepsPerioder,
        skalViseMotebehov,
        brodsmuler: [{
            tittel: getLedetekst('sykefravaerarbeidsgiver.dinesykmeldte.sidetittel'),
            sti: '/sykefravaerarbeidsgiver',
            erKlikkbar: true,
        }, {
            tittel: sykmeldt ? sykmeldt.navn : '',
            sti: sykmeldt ? `/sykefravaerarbeidsgiver/${sykmeldt.koblingId}` : '/',
            erKlikkbar: true,
        }, {
            tittel: getLedetekst('mote.moter.sidetittel'),
        }],
    };
}

const DialogmoterContainer = connect(mapStateToProps, mapDispatchToProps)(DialogmoterSide);

const DialogmoterContainerMedInnholdlaster = (props) => {
    const { params } = props;
    return (<InnholdslasterContainer
        koblingIder={[params.koblingId]}
        avhengigheter={[MOTER]}
        render={(meta) => {
            return <DialogmoterContainer {...props} meta={meta} />;
        }} />);
};

DialogmoterContainerMedInnholdlaster.propTypes = {
    params: PropTypes.shape({
        koblingId: PropTypes.string,
    }),
};

export default DialogmoterContainerMedInnholdlaster;
