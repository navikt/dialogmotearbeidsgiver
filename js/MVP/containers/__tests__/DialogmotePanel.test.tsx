import { IconStub } from '@/MVP/test/stubs/IconStub';
import { render, screen } from '@testing-library/react';
import React from 'react';
import DialogmotePanel from '../DialogmotePanel';

describe('DialogmotePanel', () => {
  test('should render with header', async () => {
    const { container } = render(
      <DialogmotePanel title="Test title" icon={IconStub}>
        <div>Test div</div>
      </DialogmotePanel>
    );

    expect(container).toHaveTextContent('Test title');
  });

  test('should render without header', async () => {
    render(
      <DialogmotePanel>
        <div>Test div</div>
      </DialogmotePanel>
    );

    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });
});
