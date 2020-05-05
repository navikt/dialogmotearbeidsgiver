import {
    NAERMESTE_LEDER_DIALOGMOTE,
    NAERMESTE_LEDER_IKKE_SVART_MOTEBEHOV,
} from '../enums/oppgavetyper';
import { MOTEBEHOV_SKJEMATYPE } from './motebehovUtils';

export const hentMoteLandingssideUrl = (sykmeldt, skalViseMotebehov) => {
    const moteVisning = skalViseMotebehov ? '' : '/mote';

    return `${process.env.REACT_APP_CONTEXT_ROOT}/${sykmeldt.koblingId}/dialogmoter${moteVisning}`;
};

export const finnOppgavetyperForMoteLandingssidelenke = (harDialogmote, skalViseMotebehov) => {
    return [
        harDialogmote ? NAERMESTE_LEDER_DIALOGMOTE : null,
        skalViseMotebehov ? NAERMESTE_LEDER_IKKE_SVART_MOTEBEHOV : null,
    ];
};

export const getArbeidsgiver = (mote) => {
    return mote.deltakere.filter((deltaker) => {
        return deltaker.type === 'arbeidsgiver';
    })[0];
};

export const getSykmeldt = (mote) => {
    return mote.deltakere.filter((deltaker) => {
        return deltaker.type === 'Bruker';
    })[0];
};

export const newDate = () => {
    const now = new Date();
    return new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getHours(), now.getUTCMinutes(), now.getUTCSeconds());
};

export const erMotePassert = (mote) => {
    if (mote.bekreftetAlternativ && mote.bekreftetAlternativ.tid <= newDate()) {
        return true;
    }
    const antallAlternativer = mote.alternativer.length;
    return mote.alternativer.filter((alternativ) => {
        return alternativ.tid <= newDate();
    }).length === antallAlternativer;
};

export const manglerArbeidsgiversSvar = (moter, sykmeldtFnr) => {
    const mote = moter.filter((_mote) => {
        return _mote.fnr === sykmeldtFnr && _mote.status === 'OPPRETTET';
    })[0];

    if (!mote) {
        return false;
    }

    const arbeidsgiver = mote.deltakere.filter((deltaker) => {
        return deltaker.type === 'arbeidsgiver';
    })[0];
    return mote.alternativer.filter((alternativ) => {
        return alternativ.created > arbeidsgiver.svartidspunkt;
    }).length > 0;
};

export const getMote = (state, fnr) => {
    const moter = state.moter
        && state.moter.data
        && state.moter.data
            .filter((s) => {
                return `${s.fnr}` === fnr;
            })
            .sort((m1, m2) => {
                return new Date(m1.opprettetTidspunkt).getTime() <= new Date(m2.opprettetTidspunkt).getTime() ? 1 : -1;
            });
    return moter && moter.length > 0
        ? moter[0]
        : null;
};

export const harMote = (state, fnr) => {
    return state.moter.data
        .filter((s) => {
            return `${s.fnr}` === fnr;
        }).length > 0;
};

export const skalViseMotebehovForSykmeldt = (motebehovReducer) => {
    if (motebehovReducer && motebehovReducer.hentingForbudt === true) {
        return false;
    }
    return motebehovReducer
        && motebehovReducer.data
        && motebehovReducer.data.visMotebehov
        && motebehovReducer.data.skjemaType === MOTEBEHOV_SKJEMATYPE.SVAR_BEHOV;
};

export const manglerMotebehovSvarBehovDialogmote2 = (motebehovReducer) => {
    const skalVise = skalViseMotebehovForSykmeldt(motebehovReducer);
    if (skalVise) {
        return !motebehovReducer.data.motebehov;
    }
    return false;
};

export const harBrukerSvartPaMotebehovINyesteOppfolgingstilfelle = (motebehovReducer) => {
    return !manglerMotebehovSvarBehovDialogmote2(motebehovReducer);
};
