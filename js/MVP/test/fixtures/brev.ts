import { brevTypes } from '@/MVP/globals/constants';
import { DocumentComponent, Brev } from '../../../api/types/brevTypes';

export const createDocumentComponent = (props?: Partial<DocumentComponent>): DocumentComponent => {
  return {
    type: 'PARAGRAPH',
    title: 'TEST_HEADER',
    texts: ['Test_text_1'],
    key: 'TEST_KEY1',
    ...props,
  };
};

export const createInnkallelseBrev = (props?: Partial<Brev>): Brev => {
  return {
    uuid: 'brev_uuid',
    deltakerUuid: 'deltaker_uuid',
    createdAt: '2019-11-08',
    brevType: brevTypes.INNKALT,
    digitalt: true,
    fritekst: 'Her kommer det en fritekst',
    sted: 'sted-felt',
    tid: '2020-11-08',
    videoLink: 'videolenke-felt',
    document: [createDocumentComponent(), createDocumentComponent()],
    virksomhetsnummer: 'virksomhetsnummer-felt',
    ...props,
  };
};

export const createReferatBrev = (props?: Partial<Brev>): Brev => {
  return {
    ...createInnkallelseBrev({ brevType: brevTypes.REFERAT }),
    ...props,
  };
};
