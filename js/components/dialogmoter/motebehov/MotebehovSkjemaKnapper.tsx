import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { Hovedknapp } from 'nav-frontend-knapper';
import { trackOnClick } from '@/amplitude/amplitude';

const texts = {
  buttonAbort: 'Avbryt',
  buttonSend: 'Send svar',
};

interface Props {
  sender: boolean;
  trackingName: string;
}

const MotebehovSkjemaKnapper = ({ sender, trackingName }: Props): ReactElement => {
  return (
    <div className="knapperad knapperad--justervenstre">
      <div className="knapperad__element">
        <Hovedknapp disabled={sender} spinner={sender} onClick={() => trackOnClick(trackingName)}>
          {texts.buttonSend}
        </Hovedknapp>
      </div>
      <div className="knapperad__element">
        <Link className="lenke" to=".">
          {texts.buttonAbort}
        </Link>
      </div>
    </div>
  );
};

export default MotebehovSkjemaKnapper;
