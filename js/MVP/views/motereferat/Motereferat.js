import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Knapp } from 'nav-frontend-knapper';
import AppSpinner from '../../../components/AppSpinner';
import Icon from '../../components/Icon';
import DialogmoteContainer from '../../containers/DialogmoteContainer';
import DocumentContainer from '../../containers/DocumentContainer';
import { brevTypes } from '../../globals/constants';
import { referatBreadcrumb } from '../../globals/paths';
import { useBrev } from '../../queries/brev';
import { useSykmeldt } from '../../queries/sykmeldt';
import { downloadBrevPdf, getProgrammaticDateFormat } from '../../utils';
import LinkInfoBox from './components/LinkInfoBox';
import NoReferatAlert from './components/NoReferatAlert';
import VeilederReferat from './components/VeilederReferat';
import FeilAlertStripe from '../../components/FeilAlertStripe';

const KnappStyled = styled(Knapp)`
  margin-top: 32px;
  width: fit-content;
`;

const texts = {
  title: 'Referat fra dialogmøte',
  button: 'LAST NED PDF',
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
  return document.filter(({ key }) => key).map(({ key }) => key);
};

const Motereferat = ({ params }) => {
  const { koblingId, date } = params;

  const brev = useBrev(koblingId);
  const sykmeldt = useSykmeldt(koblingId);
  const [downloadingPDF, setDownloadingPDF] = useState(false);

  if (brev.isLoading || sykmeldt.isLoading) {
    return <AppSpinner />;
  }

  if (brev.isError) {
    return (
      <DialogmoteContainer title={texts.title} breadcrumb={referatBreadcrumb(sykmeldt)} displayTilbakeknapp>
        <FeilAlertStripe />;
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

  const referat = getReferat(brev.data, date);

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
          {texts.button}
        </KnappStyled>

        <LinkInfoBox documentKeys={getDocumentKeys(document)} />
        <VeilederReferat />
      </React.Fragment>
    );
  }

  return (
    <DialogmoteContainer title={texts.title} breadcrumb={referatBreadcrumb(sykmeldt)} displayTilbakeknapp>
      {content}
    </DialogmoteContainer>
  );
};

Motereferat.propTypes = {
  params: PropTypes.object,
};

export default Motereferat;
