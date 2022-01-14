import DittSvarPaInnkallelse from '../DittSvarPaInnkallelse';
import { render } from '@testing-library/react';
import React from 'react';

describe('DittSvarPaInnkallelse', () => {
  test('should render KOMMER', async () => {
    const { container } = render(<DittSvarPaInnkallelse svarType={'KOMMER'} />);
    expect(container).toHaveTextContent('Du har svart at du kommer til dette dialogmøtet');
  });

  test('should render KOMMER IKKE', async () => {
    const { container } = render(<DittSvarPaInnkallelse svarType={'KOMMER_IKKE'} />);
    expect(container).toHaveTextContent('Du har svart at du ønsker å avlyse dette dialogmøtet');
  });

  test('should render NYTT_TID_STED', async () => {
    const { container } = render(<DittSvarPaInnkallelse svarType={'NYTT_TID_STED'} />);
    expect(container).toHaveTextContent('Du har svart at du ønsker å endre tidspunkt eller sted for dette dialogmøtet');
  });
});
