import React from 'react';
import Veileder from 'nav-frontend-veileder';
import styled from 'styled-components';
import Lenke from 'nav-frontend-lenker';
import VeilederAvatar from '../../../components/svg/VeilederAvatar';

const VeilederStyled = styled(Veileder)`
  max-width: 576px;
  align-self: center;
  margin: 64px 0;
`;

const texts = {
  veileder: 'Du kan lese mer om dialogmøter og hva som ellers skjer i løpet av sykefraværet på ',
  veilederUrl: 'www.nav.no/sykmeldt.',
};

const VeilederContent = () => {
  return (
    <React.Fragment>
      {texts.veileder}
      <Lenke href="www.nav.no/sykmeldt" target="_blank">
        {texts.veilederUrl}
      </Lenke>
    </React.Fragment>
  );
};

function VeilederInnkallelse() {
  return (
    <VeilederStyled tekst={<VeilederContent />} posisjon="høyre" storrelse="S" fargetema="info" hvitSnakkeboble>
      <VeilederAvatar />
    </VeilederStyled>
  );
}

export default VeilederInnkallelse;
