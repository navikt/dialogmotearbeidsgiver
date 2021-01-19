import React from 'react';
import PropTypes from 'prop-types';

const texts = {
    title: 'Møtested:',
};

const Motested = ({ sted }) => {
    return (<div className="motested">
        <strong className="motested__tittel">{texts.title}</strong>
        <p className="motested__sted">{sted}</p>
    </div>);
};

Motested.propTypes = {
    sted: PropTypes.string.isRequired,
};

export default Motested;
