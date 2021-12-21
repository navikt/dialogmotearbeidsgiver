import { render } from '@testing-library/react';
import React from 'react';
import VeilederSpeechBubble from '../VeilederSpeechBubble';

describe('VeilederSpeechBubble', () => {
  test('should render', async () => {
    const Content = <div>Test text</div>;
    const { container } = render(<VeilederSpeechBubble content={Content} />);

    expect(container).toHaveTextContent('Test text');
  });
});
