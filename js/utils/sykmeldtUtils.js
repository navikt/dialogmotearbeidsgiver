import {
    getMote,
} from './moteUtils';

export const harSykmeldinger = (state, sykmeldt) => {
    try {
        return state.sykmeldinger[`${sykmeldt.koblingId}`].data.length > 0;
    } catch (e) {
        return false;
    }
};

export const harDialogmote = (state, sykmeldt) => {
    return (sykmeldt
        && sykmeldt.fnr
        && getMote(state, sykmeldt.fnr) !== null
    ) || false;
};

export const harSykepengesoknader = (state, sykmeldt) => {
    try {
        return state.sykepengesoknader[`${sykmeldt.koblingId}`].data.length > 0;
    } catch (e) {
        return false;
    }
};

export const sykmeldtHarInnhold = (state, sykmeldt) => {
    const funksjoner = [harSykmeldinger, harDialogmote, harSykepengesoknader];
    return funksjoner
        .map((f) => {
            return f(state, sykmeldt);
        })
        .reduce((accumulator, currentValue) => {
            return accumulator || currentValue;
        });
};

export const beregnSkalHenteSykmeldtBerikelse = (sykmeldt, state) => {
    return sykmeldt
        && (sykmeldt.navn === '' || !sykmeldt.navn)
        && state.sykmeldte.henterBerikelser.indexOf(sykmeldt.koblingId) === -1
        && !state.sykmeldte.hentingFeilet;
};
