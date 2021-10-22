import React from 'react';
import { Flatknapp } from 'nav-frontend-knapper';
import { TrackedButtonProps } from './trackedButtonTypes';
import { trackOnClick } from '@/amplitude/amplitude';

export const TrackedFlatknapp = (props: TrackedButtonProps) => {
  const { children, onClick, ...rest } = props;

  const modifiedOnClick = (event) => {
    trackOnClick(children);
    onClick && onClick(event);
  };

  return (
    <Flatknapp {...rest} onClick={modifiedOnClick}>
      {children}
    </Flatknapp>
  );
};
