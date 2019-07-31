import { hentNyesteOppfoelgingstilfelleStartdato } from './moteUtils';

const isDefined = (value) => {
    return value !== undefined;
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
    if (isDefined(motebehov.friskmeldingForventning)) {
        rsMotebehovSvar.friskmeldingForventning = motebehov.friskmeldingForventning;
    }
    if (isDefined(motebehov.tiltak)) {
        rsMotebehovSvar.tiltak = motebehov.tiltak;
    }
    if (isDefined(motebehov.tiltakResultat)) {
        rsMotebehovSvar.tiltakResultat = motebehov.tiltakResultat;
    }
    if (isDefined(motebehov.forklaring)) {
        rsMotebehovSvar.forklaring = motebehov.forklaring;
    }
    rsLagreMotebehov.motebehovSvar = rsMotebehovSvar;

    return rsLagreMotebehov;
};

export const harBrukerSvartPaMotebehovINyesteOppfolgingstilfelle = (motebehov, sykeforlopsPerioder, sykmeldt) => {
    const nyesteMotebehov = motebehov.data[0];
    const startOppfolgingsdato = sykeforlopsPerioder.data && hentNyesteOppfoelgingstilfelleStartdato(sykmeldt, sykeforlopsPerioder.data);
    return !!(nyesteMotebehov && nyesteMotebehov.motebehovSvar && new Date(nyesteMotebehov.opprettetDato) >= startOppfolgingsdato);
};
