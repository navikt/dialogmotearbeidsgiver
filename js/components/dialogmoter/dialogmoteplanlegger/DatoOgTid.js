import React from 'react';
import PropTypes from 'prop-types';
import { addMinutes, visDato, visKlokkeslett } from '../../../utils/datoUtils';

const DatoOgTid = (
    {
        tid,
        Tag = 'h4',
        className = '',
    }) => {
    return (<Tag className={`motetidspunkt__label ${className}`}>
        {`${visDato(tid)} kl. ${visKlokkeslett(tid)} - ${visKlokkeslett(addMinutes(tid, 30))}`}
    </Tag>);
};

DatoOgTid.propTypes = {
    tid: PropTypes.instanceOf(Date),
    Tag: PropTypes.string,
    className: PropTypes.string,
};

export default DatoOgTid;
