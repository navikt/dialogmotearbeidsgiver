import React from 'react';
import { trackOnClick } from '@/amplitude/amplitude';
import { Tilbakeknapp } from 'nav-frontend-ikonknapper';
import { KnappBaseProps } from 'nav-frontend-knapper';

const texts = {
  trackingName: 'Tilbakeknapp',
};

interface Props extends KnappBaseProps {
  trackingName?: string;
}

export const TrackedTilbakeknapp = (props: Props) => {
  const { onClick, trackingName, ...rest } = props;

  const modifiedOnClick = (event) => {
    trackOnClick(trackingName || texts.trackingName);
    onClick && onClick(event);
  };

  return <Tilbakeknapp {...rest} onClick={modifiedOnClick} />;
};
