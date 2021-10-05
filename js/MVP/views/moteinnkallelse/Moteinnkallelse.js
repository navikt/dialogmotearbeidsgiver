import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import AlertStripe, { AlertStripeInfo } from 'nav-frontend-alertstriper';
import Lenke from 'nav-frontend-lenker';
import { brevTypes } from '../../globals/constants';
import DialogmoteContainer from '../../containers/DialogmoteContainer';
import { useBrev } from '../../queries/brev';
import AppSpinner from '../../../components/AppSpinner';
import DocumentContainer from '../../containers/DocumentContainer';
import LestInnkallelseCheckbox from './components/LestInnkallelseCheckbox';
import { innkallelseBreadcrumb, statiskeURLer } from '../../globals/paths';
import { isDateInPast } from '../../utils';
import NoInnkallelseAlert from './components/NoInnkallelseAlert';
import { useSykmeldt } from '../../queries/sykmeldt';
import FeilAlertStripe from '../../components/FeilAlertStripe';

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
  pastDateAlertBox: 'Denne innkallingen er utdatert. Du har fått en ny melding med oppdatert informasjon.',
  infoBox: 'Det er obligatorisk å delta i dialogmøter i løpet av sykefraværet. Passer ikke møtetidspunktet? ',
  infoBoxUrl: 'Ta kontakt for å gjøre en ny avtale.',
  avlysning: 'Avlysning av dialogmøte',
};

const title = (type) => {
  switch (type) {
    case brevTypes.AVLYST:
      return texts.avlysning;
    case brevTypes.ENDRING:
      return 'Endret dialogmøte';
    default:
      return 'Innkalling til dialogmøte';
  }
};

const breadcrumbTitle = (type) => {
  switch (type) {
    case brevTypes.AVLYST:
      return texts.avlysning;
    case brevTypes.ENDRING:
      return 'Endret dialogmøte';
    default:
      return 'Innkalling til dialogmøte';
  }
};

const Moteinnkallelse = ({ params }) => {
  const { koblingId } = params;

  const sykmeldt = useSykmeldt(koblingId);
  const brev = useBrev(koblingId);

  if (brev.isLoading || sykmeldt.isLoading) {
    return <AppSpinner />;
  }

  if (brev.isError || sykmeldt.isError) {
    return (
      <DialogmoteContainer
        title={title()}
        breadcrumb={innkallelseBreadcrumb(breadcrumbTitle(), sykmeldt)}
        displayTilbakeknapp
      >
        <FeilAlertStripe />
      </DialogmoteContainer>
    );
  }

  const brevHead = Array.isArray(brev.data) ? brev.data[0] : null;

  if (!brevHead || brevHead.brevType === brevTypes.REFERAT) {
    return (
      <DialogmoteContainer
        title={title()}
        breadcrumb={innkallelseBreadcrumb(breadcrumbTitle(), sykmeldt)}
        displayTilbakeknapp
      >
        <NoInnkallelseAlert />
      </DialogmoteContainer>
    );
  }

  const { tid, uuid, brevType, document, lestDato } = brevHead;

  if (brevType === brevTypes.AVLYST) {
    return (
      <DialogmoteContainer
        title={title(brevType)}
        breadcrumb={innkallelseBreadcrumb(breadcrumbTitle(brevType), sykmeldt)}
        displayTilbakeknapp
      >
        <AvlystDocumentContainerStyled document={document} />
      </DialogmoteContainer>
    );
  }

  return (
    <DialogmoteContainer
      title={title(brevType)}
      breadcrumb={innkallelseBreadcrumb(breadcrumbTitle(brevType), sykmeldt)}
      displayTilbakeknapp
    >
      {isDateInPast(tid) && <AlertStripeStyled type="advarsel">{texts.pastDateAlertBox}</AlertStripeStyled>}

      <DocumentContainer document={document}>
        {!isDateInPast(tid) && (
          <LestInnkallelseCheckbox type={brevType} brevUuid={uuid} isRead={!!lestDato} koblingId={koblingId} />
        )}
      </DocumentContainer>

      <InfoStripeStyled>
        {texts.infoBox}
        <Lenke href={statiskeURLer.KONTAKT_INFO_URL}>{texts.infoBoxUrl}</Lenke>
      </InfoStripeStyled>
    </DialogmoteContainer>
  );
};

Moteinnkallelse.propTypes = {
  params: PropTypes.object,
};

export default Moteinnkallelse;
