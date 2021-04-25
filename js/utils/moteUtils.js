export const newDate = () => {
  const now = new Date();
  return new Date(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    now.getHours(),
    now.getUTCMinutes(),
    now.getUTCSeconds()
  );
};

export const erMotePassert = (mote) => {
  if (mote.bekreftetAlternativ && mote.bekreftetAlternativ.tid <= newDate()) {
    return true;
  }
  const antallAlternativer = mote.alternativer.length;
  return (
    mote.alternativer.filter((alternativ) => {
      return alternativ.tid <= newDate();
    }).length === antallAlternativer
  );
};

export const getMote = (state, fnr) => {
  const moter =
    state.moter &&
    state.moter.data &&
    state.moter.data
      .filter((s) => {
        return `${s.fnr}` === fnr;
      })
      .sort((m1, m2) => {
        return new Date(m1.opprettetTidspunkt).getTime() <= new Date(m2.opprettetTidspunkt).getTime() ? 1 : -1;
      });
  return moter && moter.length > 0 ? moter[0] : null;
};
