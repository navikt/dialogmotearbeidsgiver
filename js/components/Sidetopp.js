import React from 'react';
import PropTypes from 'prop-types';
import { Vis } from '../utils';

const Sidetopp = ({ tittel, children, meta }) => {
  return (
    <header className="sidetopp">
      <h1 className="sidetopp__tittel">{tittel}</h1>
      <Vis hvis={!!children}>
        <div className="sidetopp__intro side-innhold js-intro">{children}</div>
      </Vis>
      <Vis hvis={!!meta}>
        <div className="sidetopp__meta">{meta}</div>
      </Vis>
    </header>
  );
};

Sidetopp.propTypes = {
  tittel: PropTypes.string.isRequired,
  meta: PropTypes.element,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
};

export default Sidetopp;
