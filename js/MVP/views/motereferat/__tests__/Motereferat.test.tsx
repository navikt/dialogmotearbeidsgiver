import { useBrev, useMutateBrevLest } from '@/MVP/queries/brev';
import { useSykmeldte } from '@/MVP/queries/sykmeldte';
import { createDocumentComponent, createInnkallelseBrev, createReferatBrev } from '@/MVP/test/fixtures/brev';
import { render } from '@testing-library/react';
import React from 'react';
import { Router } from 'react-router-dom';
import Motereferat, { getReferat } from '../Motereferat';
import { createMemoryHistory } from 'history';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    narmestelederId: 'narmestelederId123',
    date: '08-11-2020',
  }),
}));

(useSykmeldte as jest.Mock).mockReturnValue({
  data: {},
});

(useMutateBrevLest as jest.Mock).mockReturnValue({
  mutate: jest.fn(),
  isLoading: false,
});

describe('Motereferat', () => {
  test('should render referat', () => {
    (useBrev as jest.Mock).mockReturnValue({
      data: [createReferatBrev({ document: [createDocumentComponent({ texts: ['Motereferat_test_text'] })] })],
    });
    const { container } = render(
      <Router history={createMemoryHistory()}>
        <Motereferat />
      </Router>
    );

    expect(container).toHaveTextContent('Motereferat_test_text');
  });

  test('should render error alert when useBrev.isError is true', () => {
    (useBrev as jest.Mock).mockReturnValue({
      isError: true,
    });
    const { container } = render(
      <Router history={createMemoryHistory()}>
        <Motereferat />
      </Router>
    );

    expect(container).toHaveTextContent('Akkurat nå mangler det noe her.');
  });

  describe('getReferat', () => {
    test('should return null when no valid referat is recieved', () => {
      const brev = [createInnkallelseBrev()];

      const result = getReferat(brev);

      expect(result).toBeNull();
    });

    test('should return first referat when no date is recieved', () => {
      const brev = [createInnkallelseBrev(), createReferatBrev()];

      const result = getReferat(brev);

      expect(result).toMatchObject({ brevType: 'REFERAT' });
    });

    test('should return referat with matching date', () => {
      const brev = [createReferatBrev(), createReferatBrev({ tid: '2029-11-08' })];
      const date = '08-11-2029';

      const result = getReferat(brev, date);

      expect(result).toMatchObject({ tid: '2029-11-08' });
    });

    test('should return null if date does not match', () => {
      const brev = [createReferatBrev(), createReferatBrev({ tid: '2029-11-08' })];
      const date = '08-11-3000';

      const result = getReferat(brev, date);

      expect(result).toBeNull();
    });
  });
});
