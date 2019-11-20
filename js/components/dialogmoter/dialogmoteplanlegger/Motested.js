import React from 'react';
import PropTypes from 'prop-types';

const texts = {
    title: 'Møtested:',
};

const Motested = ({ sted }) => {
    return (<div className="motested">
        <h4 className="motested__tittel">{texts.title}</h4>
        <p className="motested__sted">{sted}</p>
    </div>);
};

Motested.propTypes = {
    sted: PropTypes.string.isRequired,
};

export default Motested;
