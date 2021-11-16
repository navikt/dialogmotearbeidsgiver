import React, { ReactElement } from 'react';
import { TrackedHovedknapp } from '@/components/buttons/TrackedHovedknapp';
import { Link } from 'react-router-dom';

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
        <TrackedHovedknapp disabled={sender} spinner={sender} trackingName={trackingName}>
          {texts.buttonSend}
        </TrackedHovedknapp>
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
