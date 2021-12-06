import { IconStub } from '@/MVP/test/stubs/IconStub';
import { render } from '@testing-library/react';
import React from 'react';
import DialogmotePanel from '../DialogmotePanel';

describe('DialogmotePanel', () => {
  test('should render with header', async () => {
    const { container } = render(
      <DialogmotePanel title="Test title" icon={IconStub}>
        <div>Test div</div>
      </DialogmotePanel>
    );

    expect(container).toMatchSnapshot();
  });

  test('should render without header', async () => {
    const { container } = render(
      <DialogmotePanel>
        <div>Test div</div>
      </DialogmotePanel>
    );

    expect(container).toMatchSnapshot();
  });
});
