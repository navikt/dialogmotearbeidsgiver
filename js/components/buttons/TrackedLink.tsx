import React from 'react';
import { trackOnClick } from '@/amplitude/amplitude';
import { Link, LinkProps } from 'react-router-dom';

interface Props extends LinkProps {
  trackingName?: string;
  children: string;
}

export const TrackedLink = (props: Props) => {
  const { children, trackingName, onClick, ...rest } = props;

  const modifiedOnClick = (event) => {
    trackOnClick(trackingName || children);
    onClick && onClick(event);
  };

  return (
    <Link {...rest} onClick={modifiedOnClick}>
      {children}
    </Link>
  );
};
