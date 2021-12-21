import { render, screen } from '@testing-library/react';
import DocumentRenderer from '../DocumentRenderer';
import React from 'react';
import { createDocumentComponent } from '@/MVP/test/fixtures/brev';

describe('DocumentRenderer', () => {
  test('should render PARAGRAPH', async () => {
    const document = createDocumentComponent();
    const { container } = render(<DocumentRenderer documentComponent={document} />);

    expect(container).toHaveTextContent('TEST_HEADER');
    expect(container).toHaveTextContent('Test_text_1');
    expect(container).toHaveTextContent('Test_text_2');
  });

  test('should render HEADER', async () => {
    const document = createDocumentComponent({ type: 'HEADER' });
    render(<DocumentRenderer documentComponent={document} />);

    expect(screen.getByRole('heading', { name: 'Test_text_1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Test_text_2' })).toBeInTheDocument();
  });

  test('should render LINK', async () => {
    const document = createDocumentComponent({ type: 'LINK' });
    render(<DocumentRenderer documentComponent={document} />);

    const link1 = screen.getByRole('link', { name: 'Test_text_1' });
    expect(link1).toHaveAttribute('href', 'Test_text_1');

    const link2 = screen.getByRole('link', { name: 'Test_text_2' });
    expect(link2).toHaveAttribute('href', 'Test_text_2');
  });

  test('should not render', async () => {
    const document = createDocumentComponent({ type: undefined });
    const { container } = render(<DocumentRenderer documentComponent={document} />);

    expect(container).toBeEmptyDOMElement();
  });
});
