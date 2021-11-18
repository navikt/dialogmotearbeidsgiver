import React, { ReactElement } from 'react';
import { statiskeURLer } from '@/MVP/globals/paths';
import { eventNames } from '@/amplitude/events';
import Lenke from 'nav-frontend-lenker';
import { trackOnClick } from '@/amplitude/amplitude';

const texts = {
  veileder:
    'I et dialogmøte går vi gjennom situasjonen og planlegger veien videre. De som deltar, er du, arbeidstakeren og en veileder fra NAV-kontoret, eventuelt også den som sykmelder arbeidstakeren. ',
  veilederUrl: 'Les mer om dialogmøter',
};

const VeilederLandingContent = (): ReactElement => {
  return (
    <React.Fragment>
      {texts.veileder}
      <br />
      <Lenke
        href={statiskeURLer.DIALOGMOTE_INFO_URL}
        target="_blank"
        onClick={() => trackOnClick(eventNames.lesMerOmDialogmoter)}
      >
        {texts.veilederUrl}
      </Lenke>
    </React.Fragment>
  );
};

export default VeilederLandingContent;
