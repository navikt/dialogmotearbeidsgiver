export const HENT_MOTEBEHOV_FORESPURT = 'HENT_MOTEBEHOV_FORESPURT';
export const HENT_MOTEBEHOV_HENTER = 'HENT_MOTEBEHOV_HENTER';
export const HENT_MOTEBEHOV_HENTET = 'HENT_MOTEBEHOV_HENTET';
export const HENT_MOTEBEHOV_FEILET = 'HENT_MOTEBEHOV_FEILET';
export const HENT_MOTEBEHOV_FORBUDT = 'HENT_MOTEBEHOV_FORBUDT';

export const SVAR_MOTEBEHOV_FORESPURT = 'SVAR_MOTEBEHOV_FORESPURT';
export const SVAR_MOTEBEHOV_SENDER = 'SVAR_MOTEBEHOV_SENDER';
export const SVAR_MOTEBEHOV_SENDT = 'SVAR_MOTEBEHOV_SENDT';
export const SVAR_MOTEBEHOV_FEILET = 'SVAR_MOTEBEHOV_FEILET';

export function hentMotebehov(sykmeldt) {
    return {
        type: HENT_MOTEBEHOV_FORESPURT,
        sykmeldt,
    };
}

export function hentMotebehovHenter(fnr, virksomhetsnummer) {
    return {
        type: HENT_MOTEBEHOV_HENTER,
        fnr,
        virksomhetsnummer,
    };
}

export function hentMotebehovHentet(data = {}, fnr, virksomhetsnummer) {
    return {
        type: HENT_MOTEBEHOV_HENTET,
        data,
        fnr,
        virksomhetsnummer,
    };
}

export function hentMotebehovFeilet(fnr, virksomhetsnummer) {
    return {
        type: HENT_MOTEBEHOV_FEILET,
        fnr,
        virksomhetsnummer,
    };
}

export function hentMotebehovForbudt(fnr, virksomhetsnummer) {
    return {
        type: HENT_MOTEBEHOV_FORBUDT,
        fnr,
        virksomhetsnummer,
    };
}

export function svarMotebehov(svar, sykmeldt) {
    return {
        type: SVAR_MOTEBEHOV_FORESPURT,
        svar,
        sykmeldt,
    };
}

export function svarMotebehovSender(fnr, virksomhetsnummer) {
    return {
        type: SVAR_MOTEBEHOV_SENDER,
        fnr,
        virksomhetsnummer,
    };
}

export function svarMotebehovSendt(svar, fnr, virksomhetsnummer) {
    return {
        type: SVAR_MOTEBEHOV_SENDT,
        svar,
        fnr,
        virksomhetsnummer,
    };
}

export function svarMotebehovFeilet(fnr, virksomhetsnummer) {
    return {
        type: SVAR_MOTEBEHOV_FEILET,
        fnr,
        virksomhetsnummer,
    };
}
