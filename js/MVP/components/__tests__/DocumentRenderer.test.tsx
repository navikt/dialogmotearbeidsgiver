import { render } from '@testing-library/react';
import DocumentRenderer from '../DocumentRenderer';
import React from 'react';
import { createBrevDocument } from '@/MVP/test/fixtures/brev';

describe('DocumentRenderer', () => {
  test('should render PARAGRAPH', async () => {
    const doc = createBrevDocument();

    const { container } = render(<DocumentRenderer documentComponent={doc} />);

    expect(container).toMatchSnapshot();
  });

  test('should render HEADER', async () => {
    const doc = createBrevDocument({ type: 'HEADER' });

    const { container } = render(<DocumentRenderer documentComponent={doc} />);

    expect(container).toMatchSnapshot();
  });

  test('should render LINK', async () => {
    const doc = createBrevDocument({ type: 'LINK' });

    const { container } = render(<DocumentRenderer documentComponent={doc} />);

    expect(container).toMatchSnapshot();
  });

  test('should not render', async () => {
    const doc = createBrevDocument({ type: undefined });

    const { container } = render(<DocumentRenderer documentComponent={doc} />);

    expect(container).toMatchSnapshot();
  });
});
