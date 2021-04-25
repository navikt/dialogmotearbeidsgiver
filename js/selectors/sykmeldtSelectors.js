export const sykmeldtNavnSelector = (state, koblingId) => {
  const sykmeldt = state.sykmeldte.data.find((s) => {
    return `${s.koblingId}` === `${koblingId}`;
  });

  return sykmeldt ? sykmeldt.navn : '';
};
