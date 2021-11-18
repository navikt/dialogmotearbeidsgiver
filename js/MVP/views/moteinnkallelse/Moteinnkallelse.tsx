import React, { ReactElement, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import AlertStripe, { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { brevTypes } from '../../globals/constants';
import DialogmoteContainer from '../../containers/DialogmoteContainer';
import { useBrev, useMutateBrevLest } from '../../queries/brev';
import AppSpinner from '../../../components/AppSpinner';
import DocumentContainer from '../../containers/DocumentContainer';
import { emptyBreadcrumb, innkallelseBreadcrumb, statiskeURLer } from '../../globals/paths';
import { isDateInPast } from '../../utils';
import NoInnkallelseAlert from './components/NoInnkallelseAlert';
import FeilAlertStripe from '../../components/FeilAlertStripe';
import { useSykmeldte } from '../../queries/sykmeldte';
import { eventNames } from '@/amplitude/events';
import Lenke from 'nav-frontend-lenker';
import { trackOnClick } from '@/amplitude/amplitude';
import VeilederSpeechBubble from '@/MVP/components/VeilederSpeechBubble';
import VeilederInkallelseContent from '@/MVP/views/moteinnkallelse/components/VeilederInkallelseContent';

const AlertStripeStyled = styled(AlertStripe)`
  margin-bottom: 32px;
`;

const InfoStripeStyled = styled(AlertStripeInfo)`
  margin-top: 32px;
`;

const AvlystDocumentContainerStyled = styled(DocumentContainer)`
  margin-bottom: 32px;
`;

const texts = {
  pastDateAlertBox: 'Denne innkallingen er utdatert.',
  infoBox: 'Det er obligatorisk å delta i dialogmøter i løpet av sykefraværet. Passer ikke møtetidspunktet? ',
  infoBoxUrl: 'Ta kontakt for å gjøre en ny avtale.',
  avlysning: 'Avlysning av dialogmøte',
  endring: 'Endret dialogmøte',
  innkalling: 'Innkalling til dialogmøte',
};

const title = (type: string | undefined): string => {
  switch (type) {
    case brevTypes.AVLYST:
      return texts.avlysning;
    case brevTypes.ENDRING:
      return texts.endring;
    default:
      return texts.innkalling;
  }
};

const Moteinnkallelse = (): ReactElement => {
  const { narmestelederId } = useParams<{ narmestelederId: string }>();

  const sykmeldt = useSykmeldte(narmestelederId);
  const brev = useBrev(sykmeldt.data?.fnr);
  const mutation = useMutateBrevLest();

  const brevHead = Array.isArray(brev.data) ? brev.data[0] : null;
  const { tid, uuid, brevType, document, lestDato, videoLink } = brevHead || {};

  useEffect(() => {
    if (uuid && !lestDato && !mutation.isLoading) {
      const brevUuid = uuid;
      mutation.mutate({ brevUuid });
    }
  }, [lestDato, mutation, uuid]);

  if (brev.isLoading || sykmeldt.isLoading) {
    return <AppSpinner />;
  }

  if (brev.isError || sykmeldt.isError) {
    return (
      <DialogmoteContainer title={title(brevType)} displayTilbakeknapp breadcrumb={emptyBreadcrumb()}>
        <FeilAlertStripe />
      </DialogmoteContainer>
    );
  }

  if (!brevHead || brevHead.brevType === brevTypes.REFERAT) {
    return (
      <DialogmoteContainer
        title={title(brevType)}
        breadcrumb={innkallelseBreadcrumb(title(brevType), sykmeldt.data)}
        displayTilbakeknapp
      >
        <NoInnkallelseAlert />
      </DialogmoteContainer>
    );
  }

  if (brevType === brevTypes.AVLYST) {
    return (
      <DialogmoteContainer
        title={title(brevType)}
        breadcrumb={innkallelseBreadcrumb(title(brevType), sykmeldt.data)}
        displayTilbakeknapp
      >
        <AvlystDocumentContainerStyled document={document} />
      </DialogmoteContainer>
    );
  }

  return (
    <DialogmoteContainer
      title={title(brevType)}
      breadcrumb={innkallelseBreadcrumb(title(brevType), sykmeldt.data)}
      displayTilbakeknapp
    >
      {isDateInPast(tid) && <AlertStripeStyled type="advarsel">{texts.pastDateAlertBox}</AlertStripeStyled>}

      <DocumentContainer document={document} />

      <InfoStripeStyled>
        {texts.infoBox}
        <Lenke href={statiskeURLer.KONTAKT_INFO_URL} onClick={() => trackOnClick(eventNames.kontaktOss)}>
          {texts.infoBoxUrl}
        </Lenke>
      </InfoStripeStyled>
      {videoLink && <VeilederSpeechBubble content={<VeilederInkallelseContent />} />}
    </DialogmoteContainer>
  );
};

export default Moteinnkallelse;
