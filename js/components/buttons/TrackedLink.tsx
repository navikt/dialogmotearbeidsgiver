import React from 'react';
import { trackOnClick } from '@/amplitude/amplitude';
import { Link, LinkProps } from 'react-router-dom';

interface Props extends LinkProps {
  trackingName: string;
  eventData?: Record<string, string>;
}

export const TrackedLink = (props: Props) => {
  const { children, trackingName, onClick, eventData, ...rest } = props;

  const modifiedOnClick = (event) => {
    trackOnClick(trackingName, eventData);
    onClick && onClick(event);
  };

  return (
    <Link {...rest} onClick={modifiedOnClick}>
      {children}
    </Link>
  );
};
