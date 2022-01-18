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

  test('should invoke useSvarPaInnkallelse when selecting kommer and click button', async () => {
    render(<GiSvarPaInnkallelse brevUuid={brevUuid} />);

    const radio = screen.getByRole('radio', { name: /kommer/i });
    userEvent.click(radio);
    expect(radio).toBeChecked();

    const svarButton = screen.getByRole('button', { name: /send svar/i });
    userEvent.click(svarButton);

    await waitFor(() => expect(useSvarPaInnkallelse).toHaveBeenCalledWith(brevUuid));
    await waitFor(() => expect(mutateSpy).toHaveBeenCalledWith({ svarType: 'KOMMER' }));
  });

  test('should invoke useSvarPaInnkallelse when selecting endre and click button', async () => {
    render(<GiSvarPaInnkallelse brevUuid={brevUuid} />);

    const radio = screen.getByRole('radio', { name: /endre/i });
    userEvent.click(radio);
    expect(radio).toBeChecked();

    const begrunnelseInput = screen.getByRole('textbox', { name: /endre/i });
    const begrunnelseText = 'Kan vi ta det på onsdagen i stedet?';
    userEvent.type(begrunnelseInput, begrunnelseText);

    const svarButton = screen.getByRole('button', { name: /send svar/i });
    userEvent.click(svarButton);

    await waitFor(() => expect(useSvarPaInnkallelse).toHaveBeenCalledWith(brevUuid));
    await waitFor(() =>
      expect(mutateSpy).toHaveBeenCalledWith({ svarTekst: begrunnelseText, svarType: 'NYTT_TID_STED' })
    );
  });

  test('should invoke useSvarPaInnkallelse when selecting avlyse and click button', async () => {
    render(<GiSvarPaInnkallelse brevUuid={brevUuid} />);

    const radio = screen.getByRole('radio', { name: /avlyse/i });
    userEvent.click(radio);
    expect(radio).toBeChecked();

    const begrunnelseInput = screen.getByRole('textbox', { name: /avlyse/i });
    const begrunnelseText = 'Jeg har kommet meg tilbake i jobb';
    userEvent.type(begrunnelseInput, begrunnelseText);

    const svarButton = screen.getByRole('button', { name: /send svar/i });
    userEvent.click(svarButton);

    await waitFor(() => expect(useSvarPaInnkallelse).toHaveBeenCalledWith(brevUuid));
    await waitFor(() =>
      expect(mutateSpy).toHaveBeenCalledWith({ svarTekst: begrunnelseText, svarType: 'KOMMER_IKKE' })
    );
  });

  test('should show validation error when not selecting a radio button', async () => {
    render(<GiSvarPaInnkallelse brevUuid={brevUuid} />);

    const svarButton = screen.getByRole('button', { name: /send svar/i });
    userEvent.click(svarButton);

    expect(await screen.findByRole('link', { name: /Du må velge/i })).toBeInTheDocument();
    await waitFor(() => expect(mutateSpy).not.toHaveBeenCalled());
  });

  test('should show validation error when selecting endre and not writing a reason', async () => {
    render(<GiSvarPaInnkallelse brevUuid={brevUuid} />);

    const radio = screen.getByRole('radio', { name: /endre/i });
    userEvent.click(radio);

    const svarButton = screen.getByRole('button', { name: /send svar/i });
    userEvent.click(svarButton);

    expect(await screen.findByRole('link', { name: /begrunnelse/i })).toBeInTheDocument();
    await waitFor(() => expect(mutateSpy).not.toHaveBeenCalled());
  });

  test('should show validation error when selecting avlyse and not writing a reason', async () => {
    render(<GiSvarPaInnkallelse brevUuid={brevUuid} />);

    const radio = screen.getByRole('radio', { name: /avlyse/i });
    userEvent.click(radio);

    const svarButton = screen.getByRole('button', { name: /send svar/i });
    userEvent.click(svarButton);

    expect(await screen.findByRole('link', { name: /begrunnelse/i })).toBeInTheDocument();
    await waitFor(() => expect(mutateSpy).not.toHaveBeenCalled());
  });
});
