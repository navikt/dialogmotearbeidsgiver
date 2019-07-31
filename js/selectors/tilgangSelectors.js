export const tilgangFeiletSelector = (state, koblingId) => {
    const sykmeldinger = state.sykmeldinger[koblingId] || {};
    return sykmeldinger.tilgangFeilet || false;
};
