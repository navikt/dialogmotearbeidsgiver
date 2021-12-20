import { render, screen } from '@testing-library/react';
import React from 'react';
import LinkInfoBox from '../LinkInfoBox';

describe('LinkInfoBox', () => {
  test('should display links with urls', () => {
    const documentKeyList = ['TEST_KEY1', 'TEST_KEY2'];
    render(<LinkInfoBox documentKeys={documentKeyList} />);

    const link1 = screen.getByRole('link', { name: 'text1' });
    expect(link1).toHaveAttribute('href', 'url1');

    const link2 = screen.getByRole('link', { name: 'text2' });
    expect(link2).toHaveAttribute('href', 'url2');
  });

  test('should not render invalid, undefined or duplicate keys', () => {
    const documentKeyList = ['TEST_KEY1', 'TEST_KEY1', 'TEST_KEY2', '', 'INVALID_KEY_TEST'];
    render(<LinkInfoBox documentKeys={documentKeyList} />);

    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(screen.getByRole('link', { name: 'text1' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'text2' })).toBeInTheDocument();
  });

  test('should not render when there is no valid document keys', () => {
    const documentKeyList = ['', 'INVALID_KEY_TEST'];
    const { container } = render(<LinkInfoBox documentKeys={documentKeyList} />);

    expect(container).toBeEmptyDOMElement();
  });

  test('should not render when there is no document keys', () => {
    const documentKeyList = [];
    const { container } = render(<LinkInfoBox documentKeys={documentKeyList} />);

    expect(container).toBeEmptyDOMElement();
  });
});
