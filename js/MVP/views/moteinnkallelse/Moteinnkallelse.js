import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import AlertStripe, { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { brevTypes } from '../../globals/constants';
import DialogmoteContainer from '../../containers/DialogmoteContainer';
import { useBrev, useMutateBrevLest } from '../../queries/brev';
import AppSpinner from '../../../components/AppSpinner';
import DocumentContainer from '../../containers/DocumentContainer';
import { innkallelseBreadcrumb, statiskeURLer } from '../../globals/paths';
import { isDateInPast } from '../../utils';
import NoInnkallelseAlert from './components/NoInnkallelseAlert';
import FeilAlertStripe from '../../components/FeilAlertStripe';
import { useSykmeldte } from '../../queries/sykmeldte';
import { TrackedLenke } from '@/components/buttons/TrackedLenke';

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

const title = (type) => {
  switch (type) {
    case brevTypes.AVLYST:
      return texts.avlysning;
    case brevTypes.ENDRING:
      return texts.endring;
    default:
      return texts.innkalling;
  }
};

const Moteinnkallelse = () => {
  const { narmestelederId } = useParams();

  const sykmeldt = useSykmeldte(narmestelederId);
  const brev = useBrev(narmestelederId);
  const mutation = useMutateBrevLest();

  const brevHead = Array.isArray(brev.data) ? brev.data[0] : null;
  const { tid, uuid, brevType, document, lestDato } = brevHead;

  useEffect(() => {
    if (!lestDato && !mutation.isLoading) {
      const brevUuid = uuid;
      mutation.mutate({ narmestelederId, brevUuid });
    }
  }, [brevType, lestDato, mutation, narmestelederId, uuid]);

  if (brev.isLoading || sykmeldt.isLoading) {
    return <AppSpinner />;
  }

  if (brev.isError || sykmeldt.isError) {
    return (
      <DialogmoteContainer
        title={title()}
        breadcrumb={innkallelseBreadcrumb(title(), sykmeldt.data)}
        displayTilbakeknapp
      >
        <FeilAlertStripe />
      </DialogmoteContainer>
    );
  }

  if (!brevHead || brevHead.brevType === brevTypes.REFERAT) {
    return (
      <DialogmoteContainer
        title={title()}
        breadcrumb={innkallelseBreadcrumb(title(), sykmeldt.data)}
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
        <TrackedLenke href={statiskeURLer.KONTAKT_INFO_URL}>{texts.infoBoxUrl}</TrackedLenke>
      </InfoStripeStyled>
    </DialogmoteContainer>
  );
};

export default Moteinnkallelse;
