import '@testing-library/jest-dom/extend-expect';

jest.useFakeTimers('modern');

jest.mock('@/amplitude/amplitude');
jest.mock('@/MVP/queries/brev');
jest.mock('@/MVP/utils/browserUtils');
jest.mock('@/MVP/views/motereferat/data/infoUrls');
