import { senesteTom, tidligsteFom } from '@navikt/digisyfo-npm';
import { ARBEIDSGIVER } from '../enums/moteplanleggerDeltakerTyper';
import {
    BEKREFTET,
    MOTESTATUS,
    getSvarsideModus,
} from '../utils/moteplanleggerUtils';
import { TYPE_DIALOGMOTE, TYPE_OPPFOLGINGSPLAN, TYPE_SYKEPENGESOKNAD, TYPE_SYKMELDING } from '../enums/oversiktRessurstyperEnums';
import { sykmeldtNavnSelector } from './sykmeldtSelectors';
import { erMotePassert } from '../utils/moteUtils';
import { hentOppfolgingsplanarbeidsgiverUrl } from '../utils/urlUtils';

export const harPrikk = (state, ressursId) => {
    return state.oppgaver.data.find((o) => {
        return o.ressursId === ressursId;
    }) !== undefined;
};

export const tilSykmeldingEvent = (sykmelding, koblingId, state) => {
    return {
        ressurs: sykmelding,
        status: sykmelding.status,
        type: TYPE_SYKMELDING,
        koblingId,
        url: `${process.env.REACT_APP_CONTEXT_ROOT}/${koblingId}/sykmeldinger/${sykmelding.id}`,
        dato: sykmelding.sendtdato,
        avsender: sykmeldtNavnSelector(state, koblingId),
        harPrikk: harPrikk(state, sykmelding.id),
        fom: tidligsteFom(sykmelding.mulighetForArbeid.perioder),
        tom: senesteTom(sykmelding.mulighetForArbeid.perioder),
    };
};

export const tilSoknadEvent = (sykepengesoknad, koblingId, state) => {
    return {
        ressurs: sykepengesoknad,
        status: sykepengesoknad.status,
        type: TYPE_SYKEPENGESOKNAD,
        koblingId,
        url: `${process.env.REACT_APP_CONTEXT_ROOT}/${koblingId}/sykepengesoknader/${sykepengesoknad.id}`,
        dato: sykepengesoknad.sendtTilArbeidsgiverDato || sykepengesoknad.tom,
        avsender: sykmeldtNavnSelector(state, koblingId),
        harPrikk: harPrikk(state, sykepengesoknad.id),
        fom: sykepengesoknad.fom,
        tom: sykepengesoknad.tom,
    };
};

export const mapAlleSykmeldingerTilEvents = (state) => {
    let sykmeldingerEvents = [];
    Object.keys(state.sykmeldinger)
        .forEach((koblingId) => {
            sykmeldingerEvents = [
                ...sykmeldingerEvents,
                ...state.sykmeldinger[koblingId].data.map((sykmelding) => {
                    return tilSykmeldingEvent(sykmelding, koblingId, state);
                }),
            ];
        });
    return sykmeldingerEvents;
};

export const mapAlleSoknaderTilEvents = (state) => {
    let soknaderEvents = [];
    Object.keys(state.sykepengesoknader)
        .forEach((koblingId) => {
            soknaderEvents = [
                ...soknaderEvents,
                ...state.sykepengesoknader[koblingId].data.map((soknad) => {
                    return tilSoknadEvent(soknad, koblingId, state);
                }),
            ];
        });
    return soknaderEvents;
};

export const mapAlleOppfolgingsplanerTilEvents = (state) => {
    return state.oppfolgingsdialoger.rawData.map((oppfolgingsdialog) => {
        const sykmeldt = state.sykmeldte.data.find((s) => {
            return s.fnr === oppfolgingsdialog.arbeidstaker.fnr;
        }) || {};
        return {
            ressurs: oppfolgingsdialog,
            status: oppfolgingsdialog.status,
            type: TYPE_OPPFOLGINGSPLAN,
            url: hentOppfolgingsplanarbeidsgiverUrl(sykmeldt.koblingId),
            ekstern: true,
            avsender: sykmeldt.navn,
            koblingId: sykmeldt.koblingId,
            dato: new Date(oppfolgingsdialog.sistEndretDato),
        };
    });
};

const mapAlleDialogmoterTilEvents = (state) => {
    return state.moter.data.map((mote) => {
        const sykmeldt = state.sykmeldte.data.find((s) => {
            return s.fnr === mote.fnr;
        }) || {};
        const modus = getSvarsideModus(mote, ARBEIDSGIVER);
        return {
            ressurs: mote,
            status: erMotePassert(mote)
                ? 'Passert'
                : modus === BEKREFTET
                    ? 'Bekreftet'
                    : modus === MOTESTATUS
                        ? 'Se status'
                        : 'Venter på svar',
            type: TYPE_DIALOGMOTE,
            url: `${process.env.REACT_APP_CONTEXT_ROOT}/${sykmeldt.koblingId}/mote`,
            avsender: sykmeldt.navn,
            koblingId: sykmeldt.koblingId,
            dato: new Date(mote.bekreftetTidspunkt || mote.opprettetTidspunkt),
            harPrikk: false,
        };
    });
};

export const dataTilOversiktSelector = (state) => {
    return [
        ...mapAlleSykmeldingerTilEvents(state),
        ...mapAlleSoknaderTilEvents(state),
        ...mapAlleOppfolgingsplanerTilEvents(state),
        ...mapAlleDialogmoterTilEvents(state),
    ];
};
