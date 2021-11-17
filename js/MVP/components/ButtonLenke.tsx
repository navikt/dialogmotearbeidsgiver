import React from 'react';
import { Link } from 'react-router-dom';
import { trackOnClick } from '@/amplitude/amplitude';

interface Props {
  to: string;
  trackingName?: string;
  children: string;
}

function ButtonLenke({ to, trackingName, children }: Props) {
  return trackingName ? (
    <Link to={to} className="knapp knapp--hoved knapp--mini" onClick={() => trackOnClick(trackingName)}>
      {children}
    </Link>
  ) : (
    <Link to={to} className="knapp knapp--hoved knapp--mini">
      {children}
    </Link>
  );
}

export default ButtonLenke;
