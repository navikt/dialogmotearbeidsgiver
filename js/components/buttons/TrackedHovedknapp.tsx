import React from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import { TrackedButtonProps } from './trackedButtonTypes';
import { trackOnClick } from '@/amplitude/amplitude';

export const TrackedHovedknapp = (props: TrackedButtonProps) => {
  const { children, onClick, trackingName, ...rest } = props;

  const modifiedOnClick = (event) => {
    trackOnClick(trackingName);
    onClick && onClick(event);
  };

  return (
    <Hovedknapp {...rest} onClick={modifiedOnClick}>
      {children}
    </Hovedknapp>
  );
};
