import React, { AnchorHTMLAttributes } from 'react';
import { trackOnClick } from '@/amplitude/amplitude';
import Lenke from 'nav-frontend-lenker';

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  target?: string;
  ariaLabel?: string;
  className?: string;
  children: string;
}

export const TrackedLenke = (props: Props) => {
  const { children, onClick, ...rest } = props;

  const modifiedOnClick = (event) => {
    trackOnClick(children);
    onClick && onClick(event);
  };

  return (
    <Lenke {...rest} onClick={modifiedOnClick}>
      {children}
    </Lenke>
  );
};
