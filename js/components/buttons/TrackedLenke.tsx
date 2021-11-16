import React, { AnchorHTMLAttributes } from 'react';
import { trackOnClick } from '@/amplitude/amplitude';
import Lenke from 'nav-frontend-lenker';

interface TrackedLenkeProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  target?: string;
  ariaLabel?: string;
  className?: string;
  trackingName: string;
  eventData?: Record<string, string>;
}

export const TrackedLenke = (props: TrackedLenkeProps) => {
  const { children, onClick, trackingName, eventData, ...rest } = props;

  const modifiedOnClick = (event) => {
    trackOnClick(trackingName, eventData);
    onClick && onClick(event);
  };

  return (
    <Lenke {...rest} onClick={modifiedOnClick}>
      {children}
    </Lenke>
  );
};
