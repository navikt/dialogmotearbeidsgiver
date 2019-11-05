import React from 'react';
import PropTypes from 'prop-types';
import { Textarea } from 'nav-frontend-skjema';
import { fieldPropTypes } from '../../propTypes';

const Tekstomraade = (props) => {
    const {
        meta,
        input,
        id,
        maxLength,
    } = props;

    const feilmelding = meta.error && meta.touched
        ? { feilmelding: meta.error }
        : undefined;

    return (<Textarea
        maxLength={maxLength}
        id={id}
        feil={feilmelding}
        {...input} />);
};

Tekstomraade.propTypes = {
    meta: fieldPropTypes.meta,
    id: PropTypes.string,
    rows: PropTypes.string,
    input: fieldPropTypes.input,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    maxLength: PropTypes.number,
};

export default Tekstomraade;
