export type DocumentComponentType = 'HEADER' | 'PARAGRAPH' | 'LINK' | 'HEADER_H1' | 'HEADER_H2';

export type SvarType = 'KOMMER' | 'NYTT_TID_STED' | 'KOMMER_IKKE';

export interface DocumentComponent {
  type: DocumentComponentType;
  key?: string;
  title?: string;
  texts: string[];
}

export interface Brev {
  uuid: string;
  deltakerUuid: string;
  createdAt: string;
  brevType: string;
  digitalt: boolean;
  lestDato?: string;
  fritekst: string;
  sted: string;
  tid: string;
  videoLink?: string;
  document: DocumentComponent[];
  virksomhetsnummer: string;
  svar?: Svar;
}

export interface Svar {
  svarTidspunkt: string;
  svarType: SvarType;
  svarTekst?: string;
}

export type SvarRespons = {
  svarType: SvarType;
  svarTekst?: string;
};
