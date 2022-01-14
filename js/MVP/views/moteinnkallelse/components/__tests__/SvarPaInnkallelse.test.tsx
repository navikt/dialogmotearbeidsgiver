import { useSvarPaInnkallelse } from '@/MVP/queries/brev';
import SvarPaInnkallelse from '@/MVP/views/moteinnkallelse/components/SvarPaInnkallelse';
import { render, screen } from '@testing-library/react';
import React from 'react';

describe('SvarPaInnkallelse', () => {
  beforeEach(() => {
    (useSvarPaInnkallelse as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
      isLoading: false,
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should show response if you have already responded', async () => {
    const { container } = render(<SvarPaInnkallelse svarType={'KOMMER'} brevUuid={'brev_uuid'} />);
    expect(container).toHaveTextContent(/du har svart/i);
  });

  test('should show form if you have not responded', async () => {
    render(<SvarPaInnkallelse brevUuid={'brev_uuid'} />);
    await expect(screen.getByRole('button', { name: /send svar/i })).toBeDefined();
  });
});
