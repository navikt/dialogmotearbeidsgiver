import React, { ReactElement } from 'react';
import { statiskeURLer } from '@/MVP/globals/paths';
import { Element } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';

const texts = {
  veilederText1: 'Har du blitt kalt inn til et videomøte med NAV?',
  veilederText2: 'Les denne veiledningen, så du er forberedt til møtestart. ',
  veilederLink1: 'Slik deltar du i videomøte med NAV.',
};

function VeilederInnkallelseContent(): ReactElement {
  return (
    <React.Fragment>
      <Element>{texts.veilederText1}</Element>
      {texts.veilederText2}
      <Lenke href={statiskeURLer.VIDEOMOTE_INFO_URL} target="_blank">
        {texts.veilederLink1}
      </Lenke>
      <br />
    </React.Fragment>
  );
}

export default VeilederInnkallelseContent;
