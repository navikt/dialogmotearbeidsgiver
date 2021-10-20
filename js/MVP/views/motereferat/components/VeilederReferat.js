import React from 'react';
import styled from 'styled-components';
import Veileder from 'nav-frontend-veileder';
import VeilederAvatar from '../../../components/svg/VeilederAvatar';
import { getSykefravaerarbeidsgiverUrl } from '@/utils/urlUtils';
import { statiskeURLer } from '@/MVP/globals/paths';
import { TrackedLenke } from '@/components/buttons/TrackedLenke';

const VeilederStyled = styled(Veileder)`
  max-width: 576px;
  align-self: center;
  margin: 64px 0;
`;

const texts = {
  veilederText1: 'Lurer du på hva som skjer underveis i sykefraværet?',
  veilederText2: 'Ta gjerne en titt på denne ',
  veilederText3: 'Du kan også ',
  veilederLink1: 'tidslinjen.',
  veilederLink2: 'kontakte oss.',
};

const tidslinjeURL = getSykefravaerarbeidsgiverUrl('/sykefravaer/tidslinjen');

const VeilederContent = () => {
  return (
    <React.Fragment>
      {texts.veilederText1}
      <br />
      {texts.veilederText2}
      <TrackedLenke href={tidslinjeURL} target="_blank">
        {texts.veilederLink1}
      </TrackedLenke>
      <br />
      <br />
      {texts.veilederText3}
      <TrackedLenke href={statiskeURLer.KONTAKT_INFO_URL} target="_blank">
        {texts.veilederLink2}
      </TrackedLenke>
    </React.Fragment>
  );
};

function VeilederReferat() {
  return (
    <VeilederStyled tekst={<VeilederContent />} posisjon="høyre" storrelse="S" fargetema="info" hvitSnakkeboble>
      <VeilederAvatar />
    </VeilederStyled>
  );
}

export default VeilederReferat;
