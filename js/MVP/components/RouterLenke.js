import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import styled from 'styled-components';

const LinkStyled = styled(Link)`
  width: fit-content;
`;

function ButtonLenke({ to, children }) {
  return (
    <LinkStyled to={to} className="lenke">
      {children}
    </LinkStyled>
  );
}

ButtonLenke.propTypes = {
  children: PropTypes.node,
  to: PropTypes.string,
};

export default ButtonLenke;
