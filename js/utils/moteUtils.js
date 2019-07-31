import {
    hentDagerMellomDatoer,
    leggTilDagerPaaDato,
} from './datoUtils';
import {
    NAERMESTE_LEDER_DIALOGMOTE,
    NAERMESTE_LEDER_IKKE_SVART_MOTEBEHOV,
} from '../enums/oppgavetyper';

export const OPPFOLGINGSFORLOP_MOTEBEHOV_START_DAGER = 16 * 7;
export const OPPFOLGINGSFORLOP_MOTEBEHOV_SLUTT_DAGER = 26 * 7;

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

export const erOppfoelgingsdatoNyereEnn132DagerForProdsetting = (oppfoelgingsdato) => {
    const antallDagerMellomGrensedatoOgProddato = 132;
    // Dato for prodsetting av motebehov
    const motebehovPilotProdDato = new Date('2019-03-11');
    // Dato hvor alle tidligere oppfoelgingsdatoer ikke skal vises motebehov for
    const grenseDato = leggTilDagerPaaDato(motebehovPilotProdDato, -antallDagerMellomGrensedatoOgProddato);

    return oppfoelgingsdato.getTime() > grenseDato.getTime();
};

export const erOppfoelgingsdatoPassertMed16UkerOgIkke26Uker = (startOppfolgingsdato) => {
    const oppfoelgingstilfelleStartDato = new Date(startOppfolgingsdato);
    oppfoelgingstilfelleStartDato.setHours(0, 0, 0, 0);
    const dagensDato = new Date();
    dagensDato.setHours(0, 0, 0, 0);

    const antallDagerSidenOppfoelgingsTilfelleStart = hentDagerMellomDatoer(oppfoelgingstilfelleStartDato, dagensDato);

    return antallDagerSidenOppfoelgingsTilfelleStart >= OPPFOLGINGSFORLOP_MOTEBEHOV_START_DAGER
        && antallDagerSidenOppfoelgingsTilfelleStart < OPPFOLGINGSFORLOP_MOTEBEHOV_SLUTT_DAGER;
};

export const erOppfolgingstilfelleSluttDatoPassert = (sluttOppfolgingsdato) => {
    const oppfolgingstilfelleSluttDato = new Date(sluttOppfolgingsdato);
    oppfolgingstilfelleSluttDato.setHours(0, 0, 0, 0);
    const dagensDato = new Date();
    dagensDato.setHours(0, 0, 0, 0);

    return dagensDato > oppfolgingstilfelleSluttDato;
};

export const hentNyesteOppfoelgingstilfelleStartdato = (sykmeldt, sykeforlopsPeriodeData) => {
    return sykeforlopsPeriodeData.periodeListe.length > 0 && new Date(Math.min.apply(null, sykeforlopsPeriodeData.periodeListe.map((periode) => {
        return new Date(periode.fom);
    })));
};

export const hentNyesteOppfoelgingstilfelleSluttdato = (sykmeldt, sykeforlopsPeriodeData) => {
    return sykeforlopsPeriodeData.periodeListe.length > 0 && new Date(Math.max.apply(null, sykeforlopsPeriodeData.periodeListe.map((periode) => {
        return new Date(periode.tom);
    })));
};

export const manglerMotebehovSvarIOppfolgingstilfelle = (motebehovReducer, sykeforlopsPerioder, sykmeldt) => {
    if (motebehovReducer.hentingFeilet) {
        return false;
    }
    const startOppfolgingsdato = sykeforlopsPerioder.data && hentNyesteOppfoelgingstilfelleStartdato(sykmeldt, sykeforlopsPerioder.data);
    try {
        const motebehov = motebehovReducer.data[0];
        return !motebehov.motebehovSvar || new Date(motebehov.opprettetDato) < startOppfolgingsdato;
    } catch (e) {
        return true;
    }
};

export const moteOpprettetIOppfolgingstilfelle = (mote, startOppfolgingsdato, sluttOppfolgingsdato) => {
    const moteOpprettetDato = mote && new Date(mote.opprettetTidspunkt);
    return startOppfolgingsdato <= moteOpprettetDato && moteOpprettetDato <= sluttOppfolgingsdato;
};

export const skalViseMotebehovForSykmeldt = (sykmeldt, sykeforlopsPerioder, motebehovReducer, mote) => {
    try {
        if (!sykmeldt) {
            return false;
        }
        const startOppfolgingsdato = sykeforlopsPerioder.data && hentNyesteOppfoelgingstilfelleStartdato(sykmeldt, sykeforlopsPerioder.data);
        const sluttOppfolgingsdato = sykeforlopsPerioder.data && hentNyesteOppfoelgingstilfelleSluttdato(sykmeldt, sykeforlopsPerioder.data);

        if (!startOppfolgingsdato || !sluttOppfolgingsdato) {
            return false;
        }

        if (erOppfolgingstilfelleSluttDatoPassert(sluttOppfolgingsdato)) {
            return false;
        }

        if (motebehovReducer && motebehovReducer.hentingForbudt === true) {
            return false;
        }

        if (!erOppfoelgingsdatoPassertMed16UkerOgIkke26Uker(startOppfolgingsdato) || !erOppfoelgingsdatoNyereEnn132DagerForProdsetting(startOppfolgingsdato)) {
            return false;
        }

        if (motebehovReducer && !manglerMotebehovSvarIOppfolgingstilfelle(motebehovReducer, sykeforlopsPerioder, sykmeldt)) {
            return true;
        }

        return !moteOpprettetIOppfolgingstilfelle(mote, startOppfolgingsdato, sluttOppfolgingsdato);
    } catch (e) {
        return false;
    }
};
