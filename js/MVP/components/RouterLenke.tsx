import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { trackOnClick } from '@/amplitude/amplitude';

const LinkStyled = styled(Link)`
  width: fit-content;
`;

interface Props {
  children: string;
  to: string;
  trackingName: string;
}

function RouterLenke({ to, children, trackingName }: Props): ReactElement {
  return (
    <LinkStyled to={to} onClick={() => trackOnClick(trackingName)} className="lenke">
      {children}
    </LinkStyled>
  );
}

export default RouterLenke;
