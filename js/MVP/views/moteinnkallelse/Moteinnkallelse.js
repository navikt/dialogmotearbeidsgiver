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
import { postLestBrev } from '../../services/brev';
import LestInnkallelseCheckbox from './components/LestInnkallelseCheckbox';
import { innkallelseBreadcrumb, statiskeURLer } from '../../globals/paths';
import { isDateInPast } from '../../utils';
import NoInnkallelseAlert from './components/NoInnkallelseAlert';
import FeilAlertStripe from '../../components/FeilAlertStripe';
import { useSykmeldte } from '../../queries/sykmeldte';

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

const Moteinnkallelse = ({ params }) => {
  const { narmestelederId } = params;

  const sykmeldt = useSykmeldte(narmestelederId);
  const brev = useBrev(narmestelederId);

  if (brev.isLoading || sykmeldt.isLoading) {
    return <AppSpinner />;
  }

  if (brev.isError || sykmeldt.isError) {
    return (
      <DialogmoteContainer title={title()} breadcrumb={innkallelseBreadcrumb(title(), sykmeldt.data)}>
        <FeilAlertStripe />
      </DialogmoteContainer>
    );
  }

  const brevHead = Array.isArray(brev.data) ? brev.data[0] : null;

  const { tid, uuid, brevType, document, lestDato } = brevHead;

  if (brevType === brevTypes.AVLYST && lestDato === null) {
    postLestBrev(uuid).then((r) => console.log(`Avlysning les status: ${r}`));
  }

  if (!brevHead || brevHead.brevType === brevTypes.REFERAT) {
    return (
      <DialogmoteContainer title={title()} breadcrumb={innkallelseBreadcrumb(title(), sykmeldt.data)}>
        <NoInnkallelseAlert />
      </DialogmoteContainer>
    );
  }

  if (brevType === brevTypes.AVLYST) {
    return (
      <DialogmoteContainer title={title(brevType)} breadcrumb={innkallelseBreadcrumb(title(brevType), sykmeldt.data)}>
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

      <DocumentContainer document={document}>
        {!isDateInPast(tid) && (
          <LestInnkallelseCheckbox
            type={brevType}
            brevUuid={uuid}
            isRead={!!lestDato}
            narmestelederId={narmestelederId}
          />
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
