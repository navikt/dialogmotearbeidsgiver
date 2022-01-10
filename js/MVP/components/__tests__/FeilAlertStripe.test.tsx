import { render } from '@testing-library/react';
import React from 'react';
import FeilAlertStripe from '../FeilAlertStripe';

describe('FeilAlertStripe', () => {
  test('should render', async () => {
    const { container } = render(<FeilAlertStripe />);

    expect(container).toHaveTextContent('Akkurat nå mangler det noe her.');
  });
});
