import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { TrackedLink } from '@/components/buttons/TrackedLink';

const LinkStyled = styled(TrackedLink)`
  width: fit-content;
`;

interface Props {
  children: string;
  to: string;
  trackingName: string;
}

function RouterLenke({ to, children, trackingName }: Props): ReactElement {
  return (
    <LinkStyled to={to} trackingName={trackingName} className="lenke">
      {children}
    </LinkStyled>
  );
}

export default RouterLenke;
