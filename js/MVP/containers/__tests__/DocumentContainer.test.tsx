import { createDocumentComponent } from '@/MVP/test/fixtures/brev';
import { render } from '@testing-library/react';
import React from 'react';
import DocumentContainer from '../DocumentContainer';
import { useMutateBrevLest } from '@/MVP/queries/brev';

describe('DocumentContainer', () => {
  const mutateSpy = jest.fn();

  beforeEach(() => {
    (useMutateBrevLest as jest.Mock).mockReturnValue({
      mutate: mutateSpy,
      isLoading: false,
    });
  });

  afterEach(() => {
    mutateSpy.mockReset();
  });

  test('should render', () => {
    const document = [createDocumentComponent(), createDocumentComponent()];
    const { container } = render(
      <DocumentContainer document={document} brevUuid="brev_uuid">
        <div>Test div</div>
      </DocumentContainer>
    );

    expect(container).toHaveTextContent('Test_text_1');
  });

  test('should invoke mutation.mutate when lestDato is undefined', () => {
    const document = [createDocumentComponent(), createDocumentComponent()];
    render(
      <DocumentContainer document={document} brevUuid="brev_uuid">
        <div>Test div</div>
      </DocumentContainer>
    );

    expect(mutateSpy).toHaveBeenCalledWith({ brevUuid: 'brev_uuid' });
  });

  test('should not invoke mutation.mutate when lestDato is defined', () => {
    const document = [createDocumentComponent(), createDocumentComponent()];
    render(
      <DocumentContainer document={document} brevUuid="brev_uuid" lestDato="date">
        <div>Test div</div>
      </DocumentContainer>
    );

    expect(mutateSpy).not.toHaveBeenCalled();
  });
});
