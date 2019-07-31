import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { getLedetekst } from '@navikt/digisyfo-npm';

const DialogmoterInnholdLenke = (
    {
        koblingId,
    }) => {
    return (<div className="dialogmoterInnholdLenke blokk--l">
        <article aria-labelledby="dialogmoter-mote">
            <Link className="inngangspanel" to={`${process.env.REACT_APP_CONTEXT_ROOT}/${koblingId}/mote`}>
                <span className="dialogmoterInnholdLenke__ikon">
                    <img src={`${process.env.REACT_APP_CONTEXT_ROOT}/img/svg/kalender-bgblaa.svg`} alt="Kalender" />
                </span>
                <div className="inngangspanel__innhold">
                    <header className="inngangspanel__header">
                        <h2 className="js-title inngangspanel_undertekst" id="dialogmoter-mote">
                            {getLedetekst('mote.dialogmoterInnholdLenke.tittel')}
                        </h2>
                    </header>
                </div>
            </Link>
        </article>
    </div>);
};
DialogmoterInnholdLenke.propTypes = {
    koblingId: PropTypes.string,
};

export default DialogmoterInnholdLenke;
