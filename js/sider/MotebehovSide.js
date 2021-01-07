import React, { useEffect, useState } from 'react';
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
import MotebehovInnhold from '../components/dialogmoter/motebehov/MotebehovInnhold';
import {
    hentSykmeldte,
    hentSykmeldteBerikelser,
} from '../actions/sykmeldte_actions';
import {
    hentMotebehov,
    svarMotebehov,
} from '../actions/motebehov_actions';
import { hentMoter } from '../actions/moter_actions';
import { forsoektHentetSykmeldte } from '../utils/reducerUtils';
import { getReducerKey } from '../reducers/motebehov';
import {
    skalViseMotebehovForSykmeldt,
    harBrukerSvartPaMotebehovINyesteOppfolgingstilfelle,
} from '../utils/motebehovUtils';
import { beregnSkalHenteSykmeldtBerikelse } from '../utils/sykmeldtUtils';

const texts = {
    breadcrumbBase: 'Dine sykmeldte',
    titles: {
        meldBehov: 'Meld behov for møte',
        kvittering: 'Kvittering for møtebehov'
    }
};

const MotebehovSide = (props) => {
    const {
        henter,
        hentingFeilet,
        sendingFeilet,
        skalHenteMoter,
        skalHenteBerikelse,
        skalHenteSykmeldte,
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

    const [ currentTitle, setCurrentTitle ] = useState(texts.titles.meldBehov);

    useEffect(() => {
        if (motebehov) {
            const skalViseKvittering = harBrukerSvartPaMotebehovINyesteOppfolgingstilfelle(motebehov);
            if (skalViseKvittering) {
                setCurrentTitle(texts.titles.kvittering);
            }
        }
    });

    useEffect(() => {
        if (skalHenteMoter) {
            dispatch(hentMoter());
        }
        if (skalHenteSykmeldte) {
            dispatch(hentSykmeldte());
        }
    });

    useEffect(() => {
        if (sykmeldt) {
            dispatch(hentMotebehov(sykmeldt));
            if (skalHenteBerikelse) {
                dispatch(hentSykmeldteBerikelser([sykmeldt.koblingId]));
            }
        }
    }, [sykmeldt]);

    return (
        <Side
            tittel={currentTitle}
            brodsmuler={[ ...brodsmuler, { tittel: currentTitle }]}
            laster={henter}>
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
        </Side>
    );
};
MotebehovSide.propTypes = {
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    sendingFeilet: PropTypes.bool,
    skalHenteBerikelse: PropTypes.bool,
    skalHenteMoter: PropTypes.bool,
    skalHenteSykmeldte: PropTypes.bool,
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
    const harForsoektHentetAlt = state.sykmeldte.hentingFeilet ||
        (forsoektHentetSykmeldte(state.sykmeldte)
        && motebehov.hentingForsokt);
    return {
        henter: state.sykmeldte.henter
            || state.sykmeldte.henterBerikelser.length > 0
            || !harForsoektHentetAlt,
        hentingFeilet: motebehov.hentingFeilet
            || state.sykmeldte.hentingFeilet
            || !sykmeldt,
        sendingFeilet: motebehovSvar.sendingFeilet,
        skalHenteBerikelse: beregnSkalHenteSykmeldtBerikelse(sykmeldt, state),
        skalHenteMoter: !state.moter.henter && !state.moter.hentet,
        skalHenteSykmeldte: !forsoektHentetSykmeldte(state.sykmeldte) && !state.sykmeldte.henter,
        skalViseMotebehov,
        sykmeldt,
        motebehov,
        motebehovSvarReducer: motebehovSvar,
        brodsmuler: [{
            tittel: texts.breadcrumbBase,
            sti: '/sykefravaerarbeidsgiver',
            erKlikkbar: true,
        }, {
            tittel: sykmeldt ? sykmeldt.navn : '',
            sti: sykmeldt ? `/sykefravaerarbeidsgiver/${sykmeldt.koblingId}` : '/',
            erKlikkbar: true,
        }],
    };
}

const RootPage = (props) => {
    const ConnectedMotebehovSide = connect(mapStateToProps)(MotebehovSide);
    return <ConnectedMotebehovSide {...props} />;
};

RootPage.propTypes = {
    params: PropTypes.shape({
        koblingId: PropTypes.string,
    }),
};

export default RootPage;
