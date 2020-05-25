import { isMeldMotebehovEnabled } from '../toggles';
import { FELTER as MELDMOTEBEHOV_FELTER } from '../components/dialogmoter/motebehov/meldbehov/MeldMotebehovSkjema';

const isDefined = (value) => {
    return value !== undefined;
};

export const MOTEBEHOV_SKJEMATYPE = {
    MELD_BEHOV: 'MELD_BEHOV',
    SVAR_BEHOV: 'SVAR_BEHOV',
};

export const input2RSLagreMotebehov = (motebehov, virksomhetsnummer, fnr) => {
    const rsLagreMotebehov = {};
    const rsMotebehovSvar = {};
    if (!isDefined(motebehov)) {
        return rsLagreMotebehov;
    }
    rsLagreMotebehov.virksomhetsnummer = isDefined(virksomhetsnummer)
        ? virksomhetsnummer
        : '';
    rsLagreMotebehov.arbeidstakerFnr = isDefined(fnr) ? fnr : '';

    if (isDefined(motebehov.harMotebehov)) {
        if (motebehov.harMotebehov === 'true') {
            rsMotebehovSvar.harMotebehov = true;
        } else if (motebehov.harMotebehov === 'false') {
            rsMotebehovSvar.harMotebehov = false;
        } else {
            rsMotebehovSvar.harMotebehov = motebehov.harMotebehov;
        }
    }
    if (isDefined(motebehov.forklaring) && isDefined(motebehov.lege)) {
        const separator = ' ';
        rsMotebehovSvar.forklaring = `${MELDMOTEBEHOV_FELTER.lege.tekst}${separator}${motebehov.forklaring.trim()}`;
    } else if (isDefined(motebehov.forklaring)) {
        rsMotebehovSvar.forklaring = motebehov.forklaring.trim();
    } else if (isDefined(motebehov.lege)) {
        rsMotebehovSvar.forklaring = MELDMOTEBEHOV_FELTER.lege.tekst;
    }
    rsLagreMotebehov.motebehovSvar = rsMotebehovSvar;

    return rsLagreMotebehov;
};

export const skalViseMotebehovForSykmeldt = (motebehovReducer) => {
    if (motebehovReducer && motebehovReducer.hentingForbudt === true) {
        return false;
    }
    if (isMeldMotebehovEnabled()) {
        return motebehovReducer
            && motebehovReducer.data
            && motebehovReducer.data.visMotebehov
            && (
                motebehovReducer.data.skjemaType === MOTEBEHOV_SKJEMATYPE.MELD_BEHOV ||
                motebehovReducer.data.skjemaType === MOTEBEHOV_SKJEMATYPE.SVAR_BEHOV
            );
    }
    return motebehovReducer
        && motebehovReducer.data
        && motebehovReducer.data.visMotebehov
        && motebehovReducer.data.skjemaType === MOTEBEHOV_SKJEMATYPE.SVAR_BEHOV;
};

export const isSvarBehov = (motebehovReducer) => {
    return motebehovReducer.data && motebehovReducer.data.skjemaType === MOTEBEHOV_SKJEMATYPE.SVAR_BEHOV;
};

export const harBrukerSvartPaMotebehovINyesteOppfolgingstilfelle = (motebehovReducer) => {
    const skalVise = skalViseMotebehovForSykmeldt(motebehovReducer);
    if (skalVise) {
        return !!motebehovReducer.data.motebehov;
    }
    return false;
};
