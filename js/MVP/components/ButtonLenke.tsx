import React from 'react';
import { TrackedLink } from '@/components/buttons/TrackedLink';
import { Link } from 'react-router-dom';

interface Props {
  to: string;
  trackingName?: string;
  children: string;
}

function ButtonLenke({ to, trackingName, children }: Props) {
  return trackingName ? (
    <TrackedLink to={to} className="knapp knapp--hoved knapp--mini" trackingName={trackingName}>
      {children}
    </TrackedLink>
  ) : (
    <Link to={to} className="knapp knapp--hoved knapp--mini">
      {children}
    </Link>
  );
}

export default ButtonLenke;
