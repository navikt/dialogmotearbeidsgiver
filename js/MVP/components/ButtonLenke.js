import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

function ButtonLenke({ to, children }) {
  return (
    <Link to={to} className="knapp knapp--hoved knapp--mini">
      {children}
    </Link>
  );
}

ButtonLenke.propTypes = {
  children: PropTypes.node,
  to: PropTypes.string,
};

export default ButtonLenke;
