export interface Brev {
  uuid: string;
  deltakerUuid: string;
  createdAt: string;
  brevType: string;
  digitalt: boolean;
  lestDato: string;
  fritekst: string;
  sted: string;
  tid: string;
  videoLink: string;
  document: BrevDocument[];
  virksomhetsnummer: string;
}

type BrevDocument = {
  type: string;
  texts: string[];
};
