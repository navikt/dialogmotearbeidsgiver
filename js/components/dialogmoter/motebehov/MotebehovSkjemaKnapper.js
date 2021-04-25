import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Hovedknapp } from 'nav-frontend-knapper';

const texts = {
  buttonAbort: 'Avbryt',
  buttonSend: 'Send svar',
};

const MotebehovSkjemaKnapper = ({ sender }) => {
  return (
    <div className="knapperad knapperad--justervenstre">
      <div className="knapperad__element">
        <Hovedknapp type="submit" disabled={sender} spinner={sender}>
          {texts.buttonSend}
        </Hovedknapp>
      </div>
      <div className="knapperad__element">
        <Link className="lenke" to={window.location.href.split('/behov')[0]}>
          {texts.buttonAbort}
        </Link>
      </div>
    </div>
  );
};
MotebehovSkjemaKnapper.propTypes = {
  sender: PropTypes.bool,
};

export default MotebehovSkjemaKnapper;
