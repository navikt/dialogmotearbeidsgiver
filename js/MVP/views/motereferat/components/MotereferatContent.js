import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Knapp } from 'nav-frontend-knapper';
import { DocumentTypes } from '../../../globals/constants';
import NoReferatAlert from './NoReferatAlert';
import { downloadBrevPdf } from '../../../utils';
import DocumentContainer from '../../../containers/DocumentContainer';
import LinkInfoBox from './LinkInfoBox';
import VeilederReferat from './VeilederReferat';
import { DownloadIcon } from '../../../icons';

const texts = {
  button: 'LAST NED PDF',
};

const KnappStyled = styled(Knapp)`
  margin-top: 32px;
  width: fit-content;
`;

const getDocumentKeys = (document) => {
  return document.filter(({ key }) => key).map(({ key }) => key);
};

const getReferatDocumentTittel = (document) => {
  const headers = document.filter(({ type }) => type === DocumentTypes.HEADER);
  return headers.length !== 0 ? headers[0].texts[0] : null;
};

const MotereferatContent = ({ referat }) => {
  const [downloadingPDF, setDownloadingPDF] = useState(false);

  const handleClick = async (uuid, title) => {
    setDownloadingPDF(true);
    try {
      await downloadBrevPdf(uuid, title);
    } finally {
      setDownloadingPDF(false);
    }
  };

  if (!referat) {
    return <NoReferatAlert />;
  }
  const { uuid, document } = referat;

  return (
    <React.Fragment>
      <DocumentContainer document={document} />

      <KnappStyled
        onClick={() => handleClick(uuid, getReferatDocumentTittel(document))}
        autoDisableVedSpinner
        spinner={downloadingPDF}
        mini
      >
        <DownloadIcon rightPadding="8px" />
        {texts.button}
      </KnappStyled>

      <LinkInfoBox documentKeys={getDocumentKeys(document)} />
      <VeilederReferat />
    </React.Fragment>
  );
};

MotereferatContent.propTypes = { referat: PropTypes.object };

export default MotereferatContent;
