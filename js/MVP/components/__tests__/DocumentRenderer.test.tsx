import { render } from '@testing-library/react';
import DocumentRenderer from '../DocumentRenderer';
import React from 'react';
import { createDocumentComponent } from '@/MVP/test/fixtures/brev';

describe('DocumentRenderer', () => {
  test('should render PARAGRAPH', async () => {
    const doc = createDocumentComponent();

    const { container } = render(<DocumentRenderer documentComponent={doc} />);

    expect(container).toMatchSnapshot();
  });

  test('should render HEADER', async () => {
    const doc = createDocumentComponent({ type: 'HEADER' });

    const { container } = render(<DocumentRenderer documentComponent={doc} />);

    expect(container).toMatchSnapshot();
  });

  test('should render LINK', async () => {
    const doc = createDocumentComponent({ type: 'LINK' });

    const { container } = render(<DocumentRenderer documentComponent={doc} />);

    expect(container).toMatchSnapshot();
  });

  test('should not render', async () => {
    const doc = createDocumentComponent({ type: undefined });

    const { container } = render(<DocumentRenderer documentComponent={doc} />);

    expect(container).toMatchSnapshot();
  });
});
