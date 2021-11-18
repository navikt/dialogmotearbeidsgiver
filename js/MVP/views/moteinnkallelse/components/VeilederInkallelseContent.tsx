import React, { ReactElement } from 'react';
import { statiskeURLer } from '@/MVP/globals/paths';
import { TrackedLenke } from '@/components/buttons/TrackedLenke';
import { Element } from 'nav-frontend-typografi';

const texts = {
  veilederText1: 'Har du blitt kalt inn til et videomøte med NAV?',
  veilederText2: 'Les denne veiledningen, så du er forberedt til møtestart. ',
  veilederLink1: 'Slik deltar du i videomøte med NAV.',
};

function VeilederInkallelseContent(): ReactElement {
  return (
    <React.Fragment>
      <Element>{texts.veilederText1}</Element>
      {texts.veilederText2}
      <TrackedLenke href={statiskeURLer.VIDEOMOTE_INFO_URL} target="_blank">
        {texts.veilederLink1}
      </TrackedLenke>
      <br />
    </React.Fragment>
  );
}

export default VeilederInkallelseContent;
