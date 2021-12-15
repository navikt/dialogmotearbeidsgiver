export type DocumentComponentType = 'HEADER' | 'PARAGRAPH' | 'LINK';

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
}
