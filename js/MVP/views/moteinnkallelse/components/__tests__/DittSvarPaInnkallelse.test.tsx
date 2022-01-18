import DittSvarPaInnkallelse from '../DittSvarPaInnkallelse';
import { render } from '@testing-library/react';
import React from 'react';

describe('DittSvarPaInnkallelse', () => {
  test('should render KOMMER', async () => {
    const { container } = render(<DittSvarPaInnkallelse svarType={'KOMMER'} />);
    expect(container).toHaveTextContent(/du kommer/i);
  });

  test('should render KOMMER IKKE', async () => {
    const { container } = render(<DittSvarPaInnkallelse svarType={'KOMMER_IKKE'} />);
    expect(container).toHaveTextContent(/du ønsker å avlyse/i);
  });

  test('should render NYTT_TID_STED', async () => {
    const { container } = render(<DittSvarPaInnkallelse svarType={'NYTT_TID_STED'} />);
    expect(container).toHaveTextContent(/du ønsker å endre/i);
  });
});
