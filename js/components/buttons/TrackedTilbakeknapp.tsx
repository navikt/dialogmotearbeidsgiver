import React from 'react';
import { trackOnClick } from '@/amplitude/amplitude';
import { Tilbakeknapp } from 'nav-frontend-ikonknapper';
import { KnappBaseProps } from 'nav-frontend-knapper';

interface TrackedTilbakeknappProps extends KnappBaseProps {
  trackingName: string;
}

export const TrackedTilbakeknapp = (props: TrackedTilbakeknappProps) => {
  const { onClick, trackingName, ...rest } = props;

  const modifiedOnClick = (event) => {
    trackOnClick(trackingName);
    onClick && onClick(event);
  };

  return <Tilbakeknapp {...rest} onClick={modifiedOnClick} />;
};
