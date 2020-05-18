import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    connect,
    useDispatch,
} from 'react-redux';
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
import MotebehovInnhold from '../components/dialogmoter/motebehov/MotebehovInnhold';
import {
    hentMotebehov,
    svarMotebehov,
} from '../actions/motebehov_actions';
import { hentMoter } from '../actions/moter_actions';
import { forsoektHentetSykmeldte } from '../utils/reducerUtils';
import { getReducerKey } from '../reducers/motebehov';
import { skalViseMotebehovForSykmeldt } from '../utils/motebehovUtils';

const texts = {
    breadcrumbs: {
        dineSykmeldte: 'Dine sykmeldte',
        currentPage: 'Dialogmøte',
    },
    pageTitle: 'Dialogmøtebehov',
};

const MotebehovSide = (props) => {
    const {
        henter,
        hentingFeilet,
        sendingFeilet,
        skalHenteMoter,
        skalViseMotebehov,
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
    });

    useEffect(() => {
        if (sykmeldt) {
            dispatch(hentMotebehov(sykmeldt));
        }
    }, [sykmeldt]);

    return (
        <Side
            tittel={texts.pageTitle}
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
                            svarMotebehov={doSvarMotebehov}
                            sykmeldt={sykmeldt}
                            motebehov={motebehov}
                            motebehovSvarReducer={motebehovSvarReducer}
                        />);
                    })()
                }
            </BerikSykmeldtContainer>
        </Side>
    );
};
MotebehovSide.propTypes = {
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    sendingFeilet: PropTypes.bool,
    skalHenteMoter: PropTypes.bool,
    skalViseMotebehov: PropTypes.bool,
    brodsmuler: PropTypes.arrayOf(brodsmulePt),
    sykmeldt: sykmeldtPt,
    motebehov: motebehovReducerPt,
    motebehovSvarReducer: motebehovSvarReducerPt,
};

export function mapStateToProps(state, ownProps) {
    const koblingId = ownProps.params.koblingId;
    const sykmeldt = state.sykmeldte && state.sykmeldte.data ? state.sykmeldte.data.find((s) => {
        return `${s.koblingId}` === koblingId;
    }) : {};

    let motebehov = { data: {} };
    let motebehovSvar = {};
    if (sykmeldt) {
        const motebehovReducerKey = getReducerKey(sykmeldt.fnr, sykmeldt.orgnummer);
        motebehov = state.motebehov[motebehovReducerKey] || motebehov;
        motebehovSvar = state.motebehovSvar[motebehovReducerKey] || motebehovSvar;
    }

    const skalViseMotebehov = skalViseMotebehovForSykmeldt(motebehov);
    const harForsoektHentetAlt = forsoektHentetSykmeldte(state.sykmeldte)
        && motebehov.hentingForsokt;
    return {
        henter: state.sykmeldte.henter
        || state.sykmeldte.henterBerikelser.length > 0
        || !harForsoektHentetAlt,
        hentingFeilet: motebehov.hentingFeilet
        || state.sykmeldte.hentingFeilet
        || !sykmeldt,
        sendingFeilet: motebehovSvar.sendingFeilet,
        skalHenteMoter: !state.moter.henter && !state.moter.hentet,
        skalViseMotebehov,
        sykmeldt,
        motebehov,
        motebehovSvarReducer: motebehovSvar,
        brodsmuler: [{
            tittel: texts.breadcrumbs.dineSykmeldte,
            sti: '/sykefravaerarbeidsgiver',
            erKlikkNpabar: true,
        }, {
            tittel: sykmeldt ? sykmeldt.navn : '',
            sti: sykmeldt ? `/sykefravaerarbeidsgiver/${sykmeldt.koblingId}` : '/',
            erKlikkbar: true,
        }, {
            tittel: texts.breadcrumbs.currentPage,
        }],
    };
}

const ConnectedMotebehovSide = connect(mapStateToProps)(MotebehovSide);

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
