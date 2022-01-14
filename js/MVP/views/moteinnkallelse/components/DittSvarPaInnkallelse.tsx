import React, { ReactElement } from 'react';
import { AlertStripeSuksess } from 'nav-frontend-alertstriper';
import Tekstomrade from 'nav-frontend-tekstomrade';
import { statiskeURLer } from '@/MVP/globals/paths';
import { trackOnClick } from '@/amplitude/amplitude';
import { eventNames } from '@/amplitude/events';
import Lenke from 'nav-frontend-lenker';
import styled from 'styled-components';
import { SvarType } from '@/api/types/brevTypes';

const SuksessStripeStyled = styled(AlertStripeSuksess)`
  margin-top: 2rem;
`;

const texts = {
  svartKommer: 'Du har svart at du kommer til dette dialogmøtet.',
  taKontakt: 'Ta kontakt hvis tidspunktet likevel ikke passer.',
  svartVilEndre:
    'Du har svart at du ønsker å endre tidspunkt eller sted for dette dialogmøtet.\n\nNAV-kontoret vil vurdere ønsket ditt. Du får et nytt varsel hvis møtet endres. Hvis du ikke får et nytt varsel, er det fortsatt tidspunktet og stedet i denne innkallingen som gjelder.',
  svartKommerIkke:
    'Du har svart at du ønsker å avlyse dette dialogmøtet.\n\nNAV-kontoret vil vurdere ønsket ditt. Du får et nytt varsel hvis møtet avlyses. Hvis du ikke får noe nytt varsel, må du fortsatt stille til møtet i denne innkallingen.\n\nSelv om du ønsker å avlyse, kan det hende NAV-kontoret likevel konkluderer med at et møte er nødvendig.',
};

const JegKommer = (): ReactElement => {
  return (
    <SuksessStripeStyled>
      <Tekstomrade>{texts.svartKommer}</Tekstomrade>
      <Lenke href={statiskeURLer.KONTAKT_INFO_URL} onClick={() => trackOnClick(eventNames.kontaktOss)}>
        {texts.taKontakt}
      </Lenke>
    </SuksessStripeStyled>
  );
};

const JegVilEndre = (): ReactElement => {
  return (
    <SuksessStripeStyled>
      <Tekstomrade>{texts.svartVilEndre}</Tekstomrade>
    </SuksessStripeStyled>
  );
};

const JegVilAvlyse = (): ReactElement => {
  return (
    <SuksessStripeStyled>
      <Tekstomrade>{texts.svartKommerIkke}</Tekstomrade>
    </SuksessStripeStyled>
  );
};

interface SvarProps {
  svarType: SvarType;
}

const DittSvarPaInnkallelse = ({ svarType }: SvarProps): ReactElement | null => {
  switch (svarType) {
    case 'KOMMER':
      return <JegKommer />;
    case 'NYTT_TID_STED':
      return <JegVilEndre />;
    case 'KOMMER_IKKE':
      return <JegVilAvlyse />;
  }
};

export default DittSvarPaInnkallelse;
