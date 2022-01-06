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

const JegKommer = (): ReactElement => {
  return (
    <SuksessStripeStyled>
      <Tekstomrade>{`Du har svart at du kommer til dette dialogmøtet.`}</Tekstomrade>
      <Lenke href={statiskeURLer.KONTAKT_INFO_URL} onClick={() => trackOnClick(eventNames.kontaktOss)}>
        Ta kontakt hvis tidspunktet likevel ikke passer.
      </Lenke>
    </SuksessStripeStyled>
  );
};

const JegVilEndre = (): ReactElement => {
  return (
    <SuksessStripeStyled>
      <Tekstomrade>
        {`Du har svart at du ønsker å endre tidspunkt eller sted for dette dialogmøtet.

                NAV-kontoret vil vurdere ønsket ditt. Du får et nytt varsel hvis møtet endres. Hvis du ikke får et nytt varsel, er det fortsatt tidspunktet og stedet i denne innkallingen som gjelder.`}
      </Tekstomrade>
    </SuksessStripeStyled>
  );
};

const JegVilAvlyse = (): ReactElement => {
  return (
    <SuksessStripeStyled>
      <Tekstomrade>
        {`Du har svart at du ønsker å avlyse dette dialogmøtet.

                NAV-kontoret vil vurdere ønsket ditt. Du får et nytt varsel hvis møtet avlyses. Hvis du ikke får noe nytt varsel, må du fortsatt stille til møtet i denne innkallingen.  
                
                Selv om du ønsker å avlyse, kan det hende NAV-kontoret likevel konkluderer med at et møte er nødvendig.`}
      </Tekstomrade>
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
    default:
      return null;
  }
};

export default DittSvarPaInnkallelse;
