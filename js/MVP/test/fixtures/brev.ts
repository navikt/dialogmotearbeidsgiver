import { BrevDocument } from '../../../api/types/brevTypes';

export const createBrevDocument = (props?: Partial<BrevDocument>): BrevDocument => {
  return {
    type: 'PARAGRAPH',
    title: 'TEST_HEADER',
    texts: ['Test_text_1'],
    key: 'TEST_KEY',
    ...props,
  };
};
