import React from 'react';
import { TrackedLink } from '@/components/buttons/TrackedLink';

interface Props {
  to: string;
  children: string;
}

function ButtonLenke({ to, children }: Props) {
  return (
    <TrackedLink to={to} className="knapp knapp--hoved knapp--mini">
      {children}
    </TrackedLink>
  );
}

export default ButtonLenke;
