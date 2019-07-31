import { getReducerKey } from '../reducers/motebehov';

export const skalHenteMotebehov = (state, action) => {
    const erSykmeldteHentet = state.sykmeldte.hentet && !state.sykmeldte.hentingFeilet;
    const sykmeldt = action.sykmeldt || {};
    const motebehovReducerKey = getReducerKey(sykmeldt.fnr, sykmeldt.orgnummer);
    const reducer = state.motebehov[motebehovReducerKey] || {};
    return (erSykmeldteHentet && sykmeldt.fnr && !reducer.henter && !reducer.hentingForsokt) || false;
};
