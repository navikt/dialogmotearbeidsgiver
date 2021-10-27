export type MotebehovSkjemaType = 'MELD_BEHOV' | 'SVAR_BEHOV';

export interface MotebehovSvar {
  harMotebehov: boolean;
  forklaring?: string;
}

export interface Motebehov {
  id: string;
  opprettetDato: string;
  aktorId: string;
  opprettetAv: string;
  arbeidstakerFnr: string;
  virksomhetsnummer: string;
  motebehovSvar: MotebehovSvar;
  tildeltEnhet?: string;
  behandletTidspunkt?: string;
  behandletVeilederIdent?: string;
  skjemaType?: MotebehovSkjemaType;
}

export interface MotebehovStatus {
  visMotebehov: boolean;
  skjemaType?: MotebehovSkjemaType;
  motebehov?: Motebehov;
}
