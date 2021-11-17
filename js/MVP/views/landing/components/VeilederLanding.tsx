import Veileder from 'nav-frontend-veileder';
import styled from 'styled-components';
import React, { ReactElement } from 'react';
import VeilederAvatar from '../../../components/svg/VeilederAvatar';
import { statiskeURLer } from '@/MVP/globals/paths';
import { eventNames } from '@/amplitude/events';
import Lenke from 'nav-frontend-lenker';
import { trackOnClick } from '@/amplitude/amplitude';

const VeilederStyled = styled(Veileder)`
  max-width: 576px;
  align-self: center;
  margin-bottom: 64px;
`;

const texts = {
  veileder:
    'I et dialogmøte går vi gjennom situasjonen og planlegger veien videre. De som deltar, er du, arbeidstakeren og en veileder fra NAV-kontoret, eventuelt også den som sykmelder arbeidstakeren. ',
  veilederUrl: 'Les mer om dialogmøter',
};

const VeilederContent = (): ReactElement => {
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

const VeilederLanding = (): ReactElement => {
  return (
    <VeilederStyled tekst={<VeilederContent />} posisjon="høyre" storrelse="S" fargetema="info" hvitSnakkeboble>
      <VeilederAvatar />
    </VeilederStyled>
  );
};

export default VeilederLanding;
