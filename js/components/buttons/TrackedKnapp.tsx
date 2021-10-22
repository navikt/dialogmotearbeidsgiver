import React from 'react';
import { Knapp } from 'nav-frontend-knapper';
import { TrackedButtonProps } from './trackedButtonTypes';
import { trackOnClick } from '@/amplitude/amplitude';

export const TrackedKnapp = (props: TrackedButtonProps) => {
  const { children, onClick, ...rest } = props;

  const modifiedOnClick = (event) => {
    trackOnClick(children);
    onClick && onClick(event);
  };

  return (
    <Knapp {...rest} onClick={modifiedOnClick}>
      {children}
    </Knapp>
  );
};
