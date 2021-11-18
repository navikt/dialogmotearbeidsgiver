import React, { ReactElement } from 'react';
import { statiskeURLer } from '@/MVP/globals/paths';
import { TrackedLenke } from '@/components/buttons/TrackedLenke';

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
      <TrackedLenke href={statiskeURLer.DIALOGMOTE_INFO_URL} target="_blank">
        {texts.veilederUrl}
      </TrackedLenke>
    </React.Fragment>
  );
};

export default VeilederLandingContent;
