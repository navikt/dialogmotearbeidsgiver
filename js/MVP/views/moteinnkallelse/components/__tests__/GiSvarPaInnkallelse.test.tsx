import { useSvarPaInnkallelse } from '@/MVP/queries/brev';
import GiSvarPaInnkallelse from '@/MVP/views/moteinnkallelse/components/GiSvarPaInnkallelse';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

describe('GiSvarPaInnkallelse', () => {
  const brevUuid = 'brev_uuid';
  const mutateSpy = jest.fn();

  beforeEach(() => {
    (useSvarPaInnkallelse as jest.Mock).mockReturnValue({
      mutate: mutateSpy,
      isLoading: false,
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
    mutateSpy.mockReset();
  });

  test('should send KOMMER when selecting and sending Jeg kommer', async () => {
    render(<GiSvarPaInnkallelse brevUuid={brevUuid} />);

    const radio = screen.getByRole('radio', { name: 'Jeg kommer' });
    userEvent.click(radio);
    expect(radio).toBeChecked();

    const svarButton = screen.getByRole('button', { name: 'Send svar' });
    userEvent.click(svarButton);

    await waitFor(() => expect(useSvarPaInnkallelse).toHaveBeenCalledWith(brevUuid));
    await waitFor(() => expect(mutateSpy).toHaveBeenCalledWith({ svarType: 'KOMMER' }));
  });

  test('should send NYTT_TID_STED when selecting and sending "Jeg ønsker å endre tidspunkt eller sted"', async () => {
    render(<GiSvarPaInnkallelse brevUuid={brevUuid} />);

    const radio = screen.getByRole('radio', { name: 'Jeg ønsker å endre tidspunkt eller sted' });
    userEvent.click(radio);
    expect(radio).toBeChecked();

    const begrunnelseInput = screen.getByLabelText('Hvorfor ønsker du å endre tidspunkt eller sted?');
    const begrunnelseText = 'Kan vi ta det på onsdagen i stedet?';
    userEvent.type(begrunnelseInput, begrunnelseText);

    const svarButton = screen.getByRole('button', { name: 'Send svar' });
    userEvent.click(svarButton);

    await waitFor(() => expect(useSvarPaInnkallelse).toHaveBeenCalledWith(brevUuid));
    await waitFor(() =>
      expect(mutateSpy).toHaveBeenCalledWith({ svarTekst: begrunnelseText, svarType: 'NYTT_TID_STED' })
    );
  });

  test('should send KOMMER_IKKE when selecting and sending "Jeg ønsker å avlyse"', async () => {
    render(<GiSvarPaInnkallelse brevUuid={brevUuid} />);

    const radio = screen.getByRole('radio', { name: 'Jeg ønsker å avlyse' });
    userEvent.click(radio);
    expect(radio).toBeChecked();

    const begrunnelseInput = screen.getByLabelText('Hvorfor ønsker du å avlyse?');
    const begrunnelseText = 'Jeg har kommet meg tilbake i jobb';
    userEvent.type(begrunnelseInput, begrunnelseText);

    const svarButton = screen.getByRole('button', { name: 'Send svar' });
    userEvent.click(svarButton);

    await waitFor(() => expect(useSvarPaInnkallelse).toHaveBeenCalledWith(brevUuid));
    await waitFor(() =>
      expect(mutateSpy).toHaveBeenCalledWith({ svarTekst: begrunnelseText, svarType: 'KOMMER_IKKE' })
    );
  });
});
