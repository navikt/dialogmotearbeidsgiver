import { createBrevDocument } from '@/MVP/test/fixtures/brev';
import { render } from '@testing-library/react';
import React from 'react';
import DocumentContainer from '../DocumentContainer';
import { useMutateBrevLest } from '../../queries/brev';

jest.mock('@/MVP/queries/brev');

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
    const document = [createBrevDocument(), createBrevDocument()];
    const { container } = render(
      <DocumentContainer document={document} brevUuid="brev_uuid">
        <div>Test div</div>
      </DocumentContainer>
    );

    expect(container).toMatchSnapshot();
  });

  test('should invoke mutation.mutate when lestDato is undefined', () => {
    const document = [createBrevDocument(), createBrevDocument()];
    render(
      <DocumentContainer document={document} brevUuid="brev_uuid">
        <div>Test div</div>
      </DocumentContainer>
    );

    expect(mutateSpy).toHaveBeenCalledWith({ brevUuid: 'brev_uuid' });
  });

  test('should not invoke mutation.mutate when lestDato is defined', () => {
    const document = [createBrevDocument(), createBrevDocument()];
    render(
      <DocumentContainer document={document} brevUuid="brev_uuid" lestDato="date">
        <div>Test div</div>
      </DocumentContainer>
    );

    expect(mutateSpy).not.toHaveBeenCalled();
  });
});
