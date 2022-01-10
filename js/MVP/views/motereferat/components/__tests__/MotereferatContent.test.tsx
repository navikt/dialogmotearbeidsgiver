import { createDocumentComponent, createReferatBrev } from '@/MVP/test/fixtures/brev';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import MotereferatContent, { getDocumentKeys } from '../MotereferatContent';
import { useMutateBrevLest } from '@/MVP/queries/brev';
import { downloadBrevPdf } from '@/MVP/utils/browserUtils';

describe('MotereferatContent', () => {
  beforeEach(() => {
    (useMutateBrevLest as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
      isLoading: false,
    });
    (downloadBrevPdf as jest.Mock).mockImplementation(() => Promise.resolve());
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should render NoReferatAlert when recieved no referat', () => {
    const referat = undefined;
    const { container } = render(<MotereferatContent referat={referat} />);

    expect(container).toHaveTextContent('Vi finner ikke noe referat knyttet til denne datoen.');
  });

  test('should invoke downloadBrevPdf() and disable download button on click', async () => {
    const referat = createReferatBrev();
    render(<MotereferatContent referat={referat} />);

    const downloadButton = screen.getByRole('button', { name: 'LAST NED PDF' });
    fireEvent.click(downloadButton);

    expect(downloadButton).toBeDisabled();

    await waitFor(() => expect(downloadBrevPdf).toHaveBeenCalledWith('brev_uuid', '08-11-2020', 'referat'));

    expect(downloadButton).not.toBeDisabled();
  });

  describe('getDocumentKeys', () => {
    test('should render NoReferatAlert when recieved no referat', () => {
      const documents = [
        createDocumentComponent({ key: 'key_1' }),
        createDocumentComponent({ key: 'key_2' }),
        createDocumentComponent({ key: undefined }),
      ];
      const documentKeys = getDocumentKeys(documents);

      expect(documentKeys).toEqual(['key_1', 'key_2']);
    });
  });
});
