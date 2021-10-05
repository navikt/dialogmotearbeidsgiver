import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Knapp } from 'nav-frontend-knapper';
import NoReferatAlert from './NoReferatAlert';
import { downloadBrevPdf } from '../../../utils';
import DocumentContainer from '../../../containers/DocumentContainer';
import Icon from '../../../components/Icon';
import LinkInfoBox from './LinkInfoBox';
import VeilederReferat from './VeilederReferat';
import downloadImage from '../../../../../img/svg/download.svg'

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

const MotereferatContent = ({ referat }) => {
  const [downloadingPDF, setDownloadingPDF] = useState(false);

  const handleClick = async (uuid) => {
    setDownloadingPDF(true);
    try {
      await downloadBrevPdf(uuid);
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

      <KnappStyled onClick={() => handleClick(uuid)} autoDisableVedSpinner spinner={downloadingPDF} mini>
        <Icon icon={downloadImage} rightPadding="8px" />
        {texts.button}
      </KnappStyled>

      <LinkInfoBox documentKeys={getDocumentKeys(document)} />
      <VeilederReferat />
    </React.Fragment>
  );
};

MotereferatContent.propTypes = { referat: PropTypes.object };

export default MotereferatContent;
