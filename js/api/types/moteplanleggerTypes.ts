export type MoteplanleggerStatus = 'OPPRETTET' | 'BEKREFTET' | 'AVBRUTT' | 'FLERE_TIDSPUNKT';

export interface MoteplanleggerAlternativ {
  id: number;
  tid: string;
  created: string;
  sted: string;
  valgt: boolean;
}

export interface MoteplanleggerDeltaker {
  navn: string;
  orgnummer: string;
  type: string;
  svartidspunkt?: string;
  svar: MoteplanleggerAlternativ[];
}

export interface Moteplanlegger {
  moteUuid: string;
  status: MoteplanleggerStatus;
  fnr: string;
  opprettetTidspunkt: string;
  bekreftetTidspunkt?: string;
  deltakere: MoteplanleggerDeltaker[];
  bekreftetAlternativ?: MoteplanleggerAlternativ;
  alternativer: MoteplanleggerAlternativ[];
}
