import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLedetekst } from '@navikt/digisyfo-npm';
import Side from './Side';
import AppSpinner from '../components/AppSpinner';
import Feilmelding from '../components/Feilmelding';
import AvbruttMote from '../components/dialogmoter/dialogmoteplanlegger/AvbruttMote';
import BekreftetKvittering from '../components/dialogmoter/dialogmoteplanlegger/BekreftetKvittering';
import Kvittering from '../components/dialogmoter/dialogmoteplanlegger/Kvittering';
import MotePassert from '../components/dialogmoter/dialogmoteplanlegger/MotePassert';
import Svarside from '../components/dialogmoter/dialogmoteplanlegger/Svarside';
import { ARBEIDSGIVER } from '../enums/moteplanleggerDeltakerTyper';
import {
    AVBRUTT,
    BEKREFTET,
    MOTESTATUS,
    getSvarsideModus,
} from '../utils/moteplanleggerUtils';
import { sendSvar } from '../actions/moter_actions';
import { hentMotebehov } from '../actions/motebehov_actions';
import {
    erMotePassert,
    getMote,
} from '../utils/moteUtils';
import {
    brodsmule as brodsmulePt,
    motePt,
    sykmeldt as sykemeldtPt,
} from '../propTypes';
import InnholdslasterContainer, { MOTER } from '../containers/InnholdslasterContainer';
import { getReducerKey } from '../reducers/motebehov';

export const DialogmoteSideComponent = (props) => {
    const {
        brodsmuler,
        mote,
        moteIkkeFunnet,
        henter,
        hentingFeilet,
        doHentMotebehov,
        sykmeldt,
    } = props;
    const modus = getSvarsideModus(mote, ARBEIDSGIVER);

    useEffect(() => {
        doHentMotebehov(sykmeldt);
    });

    return (
        <Side tittel={getLedetekst('mote.sidetittel')} brodsmuler={brodsmuler} laster={henter}>
            {
                (() => {
                    if (henter) {
                        return <AppSpinner />;
                    }
                    if (hentingFeilet) {
                        return <Feilmelding />;
                    }
                    if (moteIkkeFunnet) {
                        return (<Feilmelding
                            tittel={getLedetekst('sykefravaerarbeidsgiver.ingen-moteforesporsel.tittel')}
                            melding={getLedetekst('sykefravaerarbeidsgiver.ingen-moteforesporsel.melding')} />);
                    }
                    if (erMotePassert(mote)) {
                        return (<MotePassert
                            deltakertype={ARBEIDSGIVER}
                        />);
                    }
                    if (modus === BEKREFTET) {
                        return (<BekreftetKvittering
                            mote={mote}
                            deltakertype={ARBEIDSGIVER}
                        />);
                    }
                    if (modus === MOTESTATUS) {
                        return (<Kvittering
                            mote={mote}
                            deltakertype={ARBEIDSGIVER}
                        />);
                    }
                    if (modus === AVBRUTT) {
                        return (<AvbruttMote
                            mote={mote}
                            deltakertype={ARBEIDSGIVER}
                        />);
                    }
                    if (mote) {
                        return (<Svarside
                            {...props}
                            deltakertype={ARBEIDSGIVER}
                        />);
                    }
                    return <Feilmelding />;
                })()
            }
        </Side>
    );
};

DialogmoteSideComponent.propTypes = {
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    mote: motePt,
    doHentMotebehov: PropTypes.func,
    brodsmuler: PropTypes.arrayOf(brodsmulePt),
    moteIkkeFunnet: PropTypes.bool,
    sykmeldt: sykemeldtPt,
};

export function mapStateToProps(state, ownProps) {
    const koblingId = ownProps.params.koblingId;

    const sykmeldt = state.sykmeldte && state.sykmeldte.data ? state.sykmeldte.data.filter((s) => {
        return `${s.koblingId}` === koblingId;
    })[0] : {};

    let motebehovReducer = state.motebehov;

    if (sykmeldt) {
        const motebehovReducerKey = getReducerKey(sykmeldt.fnr, sykmeldt.orgnummer);
        motebehovReducer = state.motebehov[motebehovReducerKey] || motebehovReducer;
    }
    return {
        henter: state.ledetekster.henter
            || state.sykmeldte.henter
            || state.moter.henter,
        hentingFeilet: state.sykmeldte.hentingFeilet
            || state.moter.hentingFeilet
            || !sykmeldt,
        mote: sykmeldt
        && getMote(state, sykmeldt.fnr),
        sender: state.svar.sender === true,
        sendingFeilet: state.svar.sendingFeilet === true,
        moteIkkeFunnet: !sykmeldt
            || getMote(state, sykmeldt.fnr) === null,
        motebehovReducer,
        sykmeldt,
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

const ConnectedSide = connect(mapStateToProps, {
    sendSvar,
    doHentMotebehov: hentMotebehov,
})(DialogmoteSideComponent);

const DialogmoteSide = (props) => {
    const { params } = props;
    return (<InnholdslasterContainer
        koblingIder={[params.koblingId]}
        avhengigheter={[MOTER]}
        render={(meta) => {
            return <ConnectedSide {...props} meta={meta} />;
        }} />);
};

DialogmoteSide.propTypes = {
    params: PropTypes.shape({
        koblingId: PropTypes.string,
    }),
};

export default DialogmoteSide;
