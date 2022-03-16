import VeilederSpeechBubble from '@/MVP/components/VeilederSpeechBubble';
import { isDateInPast } from '@/MVP/utils/dateUtils';
import SvarPaInnkallelse from '@/MVP/views/moteinnkallelse/components/SvarPaInnkallelse';
import VeilederInnkallelseContent from '@/MVP/views/moteinnkallelse/components/VeilederInnkallelseContent';
import AlertStripe from 'nav-frontend-alertstriper';
import React, { ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import AppSpinner from '../../../components/AppSpinner';
import FeilAlertStripe from '../../components/FeilAlertStripe';
import DialogmoteContainer from '../../containers/DialogmoteContainer';
import DocumentContainer from '../../containers/DocumentContainer';
import { brevTypes } from '../../globals/constants';
import { emptyBreadcrumb, innkallelseBreadcrumb } from '../../globals/paths';
import { useBrev } from '../../queries/brev';
import { useSykmeldte } from '../../queries/sykmeldte';
import NoInnkallelseAlert from './components/NoInnkallelseAlert';

const AlertStripeStyled = styled(AlertStripe)`
  margin-bottom: 32px;
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

const title = (type: string): string => {
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

  if (brev.isError || sykmeldt.isError) {
    return (
      <DialogmoteContainer title={''} displayTilbakeknapp breadcrumb={emptyBreadcrumb()}>
        <FeilAlertStripe />
      </DialogmoteContainer>
    );
  }

  if (brev.isSuccess && sykmeldt.isSuccess) {
    const brevHead = brev.data[0];
    const { tid, uuid, brevType, document, lestDato, videoLink, svar } = brevHead;

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

    const isLegacyHeader = document[0]?.type !== 'HEADER_H1';
    const pageHeader = isLegacyHeader ? title(brevType) : undefined;

    if (brevType === brevTypes.AVLYST) {
      return (
        <DialogmoteContainer
          title={pageHeader}
          breadcrumb={innkallelseBreadcrumb(title(brevType), sykmeldt.data)}
          displayTilbakeknapp
        >
          <AvlystDocumentContainerStyled document={document} brevUuid={uuid} lestDato={lestDato} />
        </DialogmoteContainer>
      );
    }

    return (
      <DialogmoteContainer
        title={pageHeader}
        breadcrumb={innkallelseBreadcrumb(title(brevType), sykmeldt.data)}
        displayTilbakeknapp
      >
        {isDateInPast(tid) && <AlertStripeStyled type="advarsel">{texts.pastDateAlertBox}</AlertStripeStyled>}

        <DocumentContainer document={document} brevUuid={uuid} lestDato={lestDato} />

        <SvarPaInnkallelse brevUuid={uuid} svarType={svar?.svarType} />

        {videoLink && <VeilederSpeechBubble content={<VeilederInnkallelseContent />} />}
      </DialogmoteContainer>
    );
  }
  return <AppSpinner />;
};

export default Moteinnkallelse;
