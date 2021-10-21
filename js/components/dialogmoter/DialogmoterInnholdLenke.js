import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import kalenderBlaImage from '../../../img/svg/kalender-bgblaa.svg';

const texts = {
  panel: {
    title: 'Dialogmøte',
    kalenderImageAltText: 'Kalender',
  },
};

const DialogmoterInnholdLenke = ({ narmestelederId }) => {
  return (
    <div className="dialogmoterInnholdLenke blokk--l">
      <article aria-labelledby="dialogmoter-mote">
        <Link className="inngangspanel" to={`${process.env.REACT_APP_CONTEXT_ROOT}/${narmestelederId}/mote`}>
          <span className="dialogmoterInnholdLenke__ikon">
            <img src={kalenderBlaImage} alt={texts.kalenderImageAltText} />
          </span>
          <div className="inngangspanel__innhold">
            <header className="inngangspanel__header">
              <h2 className="js-title inngangspanel_undertekst" id="dialogmoter-mote">
                {texts.panel.title}
              </h2>
            </header>
          </div>
        </Link>
      </article>
    </div>
  );
};
DialogmoterInnholdLenke.propTypes = {
  narmestelederId: PropTypes.string,
};

export default DialogmoterInnholdLenke;
