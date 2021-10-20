import React, { ReactElement } from 'react';
import { TrackedLink } from '@/components/buttons/TrackedLink';
import { TrackedHovedknapp } from '@/components/buttons/TrackedHovedknapp';

const texts = {
  buttonAbort: 'Avbryt',
  buttonSend: 'Send svar',
};

interface Props {
  sender: boolean;
}

const MotebehovSkjemaKnapper = ({ sender }: Props): ReactElement => {
  return (
    <div className="knapperad knapperad--justervenstre">
      <div className="knapperad__element">
        <TrackedHovedknapp disabled={sender} spinner={sender}>
          {texts.buttonSend}
        </TrackedHovedknapp>
      </div>
      <div className="knapperad__element">
        <TrackedLink className="lenke" to=".">
          {texts.buttonAbort}
        </TrackedLink>
      </div>
    </div>
  );
};

export default MotebehovSkjemaKnapper;
