import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Knapp } from 'nav-frontend-knapper';
import styled from 'styled-components';
import AlertStripe from 'nav-frontend-alertstriper';
import DialogmoteContainer from '../../containers/DialogmoteContainer';
import DocumentContainer from '../../containers/DocumentContainer';
import LinkInfoBox from './components/LinkInfoBox';
import { useBrev } from '../../hooks/brev';
import AppSpinner from '../../../components/AppSpinner';
import { brevTypes } from '../../globals/constants';
import { downloadBrevPdf, getProgrammaticDateFormat } from '../../utils';
import VeilederReferat from './components/VeilederReferat';
import { referatBreadcrumb } from '../../globals/paths';
import Icon from '../../components/Icon';
import NoReferatAlert from './components/NoReferatAlert';

const AlertStripeStyled = styled(AlertStripe)`
  margin-bottom: 32px;
`;

const KnappStyled = styled(Knapp)`
  margin-top: 32px;
  width: fit-content;
`;

const texts = {
  title: 'Referat fra dialogmøte',
};

const getReferat = (brev, date) => {
  const referater = brev.filter(({ brevType }) => brevType === brevTypes.REFERAT);

  if (referater.length === 0) {
    return null;
  }

  if (!date) {
    return referater[0];
  }

  const referat = referater.find(({ tid }) => getProgrammaticDateFormat(tid) === date);

  if (!referat) {
    return null;
  }

  return referat;
};

const getDocumentKeys = (document) => {
  const documentKeys = document.filter(({ key }) => key).map(({ key }) => key);

  return documentKeys;
};

const Motereferat = ({ params }) => {
  const { data, isLoading, isError } = useBrev();
  const [downloadingPDF, setDownloadingPDF] = useState(false);

  if (isLoading) {
    return <AppSpinner />;
  }

  if (isError) {
    return (
      <DialogmoteContainer title={texts.title} breadcrumb={referatBreadcrumb(KOBLINGSID)} displayTilbakeknapp>
        <AlertStripeStyled type="feil">
          Akkurat nå mangler det noe her. Vi har tekniske problemer som vi jobber med å løse. Prøv gjerne igjen om en
          stund.
        </AlertStripeStyled>
      </DialogmoteContainer>
    );
  }

  const handleClick = async (uuid) => {
    setDownloadingPDF(true);
    try {
      await downloadBrevPdf(uuid);
    } finally {
      setDownloadingPDF(false);
    }
  };

  const dateParam = params.date;
  const referat = getReferat(data, dateParam);

  let content;
  if (!referat) {
    content = <NoReferatAlert />;
  } else {
    const { uuid, document } = referat;

    content = (
      <React.Fragment>
        <DocumentContainer document={document} />

        <KnappStyled onClick={() => handleClick(uuid)} autoDisableVedSpinner spinner={downloadingPDF} mini>
          <Icon icon="download" rightPadding="8px" />
          LAST NED PDF
        </KnappStyled>

        <LinkInfoBox documentKeys={getDocumentKeys(document)} />
        <VeilederReferat />
      </React.Fragment>
    );
  }

  return (
    <DialogmoteContainer title={texts.title} breadcrumb={referatBreadcrumb(KOBLINGSID)} displayTilbakeknapp>
      {content}
    </DialogmoteContainer>
  );
};

Motereferat.propTypes = {
  params: PropTypes.object,
};

export default Motereferat;
