import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import DialogmoteContainer from '../DialogmoteContainer';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

describe('DialogmoteContainer', () => {
  test('should render', () => {
    const { container } = render(
      <DialogmoteContainer title="Test title" breadcrumb={[]}>
        <div>Test div</div>
      </DialogmoteContainer>
    );

    expect(container).toHaveTextContent('Test div');
  });

  test('should render tilbakeknapp and invoke goBack on click', () => {
    const goBackMock = jest.fn();
    const historyStub = createMemoryHistory();
    const history = { ...historyStub, goBack: goBackMock };

    render(
      <Router history={history}>
        <DialogmoteContainer title="Test title" breadcrumb={[]} displayTilbakeknapp={true}>
          <div>Test div</div>
        </DialogmoteContainer>
      </Router>
    );

    const tilbakeknapp = screen.getByRole('button', { name: 'Tilbake' });
    expect(tilbakeknapp).toBeInTheDocument();

    fireEvent.click(tilbakeknapp);
    expect(goBackMock).toHaveBeenCalled();
  });
});
