import Veileder from 'nav-frontend-veileder';
import styled from 'styled-components';
import React, { ReactElement } from 'react';
import VeilederAvatar from '../../../components/svg/VeilederAvatar';
import { statiskeURLer } from '@/MVP/globals/paths';
import { TrackedLenke } from '@/components/buttons/TrackedLenke';
import { eventNames } from '@/amplitude/events';

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
      <TrackedLenke
        href={statiskeURLer.DIALOGMOTE_INFO_URL}
        target="_blank"
        trackingName={eventNames.lesMerOmDialogmoter}
      >
        {texts.veilederUrl}
      </TrackedLenke>
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
