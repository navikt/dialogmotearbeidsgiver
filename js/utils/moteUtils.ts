import { Moteplanlegger } from '@/api/types/moteplanleggerTypes';

export const erMotePassert = (mote: Moteplanlegger) => {
  if (mote.bekreftetAlternativ?.tid && new Date(mote.bekreftetAlternativ.tid) <= new Date()) {
    return true;
  }
  const antallAlternativer = mote.alternativer.length;
  return (
    mote.alternativer.filter((alternativ) => {
      return new Date(alternativ.tid) <= new Date();
    }).length === antallAlternativer
  );
};

export const getMote = (state: { moter?: { data: Moteplanlegger[] } }, fnr: string) => {
  const moter =
    state.moter?.data &&
    state.moter.data
      .filter((s) => {
        return `${s.fnr}` === fnr;
      })
      .sort((m1, m2) => {
        return new Date(m1.opprettetTidspunkt).getTime() <= new Date(m2.opprettetTidspunkt).getTime() ? 1 : -1;
      });
  return moter && moter.length > 0 ? moter[0] : null;
};
