import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import AlertStripe, { AlertStripeInfo } from 'nav-frontend-alertstriper';
import Lenke from 'nav-frontend-lenker';
import { brevTypes } from '../../globals/constants';
import DialogmoteContainer from '../../containers/DialogmoteContainer';
import { useBrev } from '../../hooks/brev';
import AppSpinner from '../../../components/AppSpinner';
import DocumentContainer from '../../containers/DocumentContainer';
import VeilederInnkallelse from './components/VeilederInnkallelse';
import LestInnkallelseCheckbox from './components/LestInnkallelseCheckbox';
import { innkallelseBreadcrumb } from '../../globals/paths';
import { isDateInPast } from '../../utils';
import NoInnkallelseAlert from './components/NoInnkallelseAlert';
import { useSykmeldt } from '../../hooks/sykmeldt';
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
};

const title = (type) => {
  switch (type) {
    case brevTypes.AVLYST:
      return 'Avlysning av dialogmøte';
    case brevTypes.ENDRING:
      return 'Endret dialogmøte';
    default:
      return 'Innkalling til dialogmøte';
  }
};

const breadcrumbTitle = (type) => {
  switch (type) {
    case brevTypes.AVLYST:
      return 'Avlysning av dialogmøte';
    case brevTypes.ENDRING:
      return 'Endret dialogmøte';
    default:
      return 'Innkalling til dialogmøte';
  }
};

const Moteinnkallelse = ({ params }) => {
  const { koblingId } = params;

  const sykmeldt = useSykmeldt(koblingId);
  const innkallelse = useBrev(koblingId);

  if (innkallelse.isLoading || sykmeldt.isLoading) {
    return <AppSpinner />;
  }

  if (innkallelse.isError || sykmeldt.isLoading) {
    return (
      <DialogmoteContainer title={title()} breadcrumb={innkallelseBreadcrumb(breadcrumbTitle(), sykmeldt)}>
        <FeilAlertStripe />;
      </DialogmoteContainer>
    );
  }

  const innkallelseHead = innkallelse.data[0];
  const { tid, uuid, brevType, document, lestDato } = innkallelseHead;

  if (!innkallelseHead || brevType === brevTypes.REFERAT) {
    return (
      <DialogmoteContainer title={title()} breadcrumb={innkallelseBreadcrumb(breadcrumbTitle(), sykmeldt)}>
        <NoInnkallelseAlert />;
      </DialogmoteContainer>
    );
  }

  if (brevType === brevTypes.AVLYST) {
    return (
      <DialogmoteContainer
        title={title(brevType)}
        breadcrumb={innkallelseBreadcrumb(breadcrumbTitle(brevType), sykmeldt)}
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
        {!isDateInPast(tid) && <LestInnkallelseCheckbox type={brevType} varselUuid={uuid} isRead={!!lestDato} />}
      </DocumentContainer>

      <InfoStripeStyled>
        {texts.infoBox}
        <Lenke href="TODO">{texts.infoBoxUrl}</Lenke>
      </InfoStripeStyled>

      <VeilederInnkallelse />
    </DialogmoteContainer>
  );
};

Moteinnkallelse.propTypes = {
  params: PropTypes.object,
};

export default Moteinnkallelse;
