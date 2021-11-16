import React from 'react';
import { Fareknapp } from 'nav-frontend-knapper';
import { TrackedButtonProps } from './trackedButtonTypes';
import { trackOnClick } from '@/amplitude/amplitude';

export const TrackedFareknapp = (props: TrackedButtonProps) => {
  const { children, onClick, trackingName, ...rest } = props;

  const modifiedOnClick = (event) => {
    trackOnClick(trackingName);
    onClick && onClick(event);
  };

  return (
    <Fareknapp {...rest} onClick={modifiedOnClick}>
      {children}
    </Fareknapp>
  );
};
