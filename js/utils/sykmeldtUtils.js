export const beregnSkalHenteSykmeldtBerikelse = (sykmeldt, state) => {
  return (
    sykmeldt &&
    (sykmeldt.navn === '' || !sykmeldt.navn) &&
    state.sykmeldte.henterBerikelser.indexOf(sykmeldt.koblingId) === -1 &&
    !state.sykmeldte.hentingFeilet
  );
};
