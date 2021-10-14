import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Knapp } from 'nav-frontend-knapper';
import { useMutateBrevLest } from '../../../queries/brev';
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

const MotereferatContent = ({ referat, narmestelederId }) => {
  const mutation = useMutateBrevLest();
  const [downloadingPDF, setDownloadingPDF] = useState(false);

  useEffect(() => {
    if (referat.lestDato === null) {
      const brevUuid = referat.uuid;
      mutation.mutate({ narmestelederId, brevUuid });
    }
  }, []);

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
        <DownloadIcon rightPadding="8px" />
        {texts.button}
      </KnappStyled>

      <LinkInfoBox documentKeys={getDocumentKeys(document)} />
      <VeilederReferat />
    </React.Fragment>
  );
};

MotereferatContent.propTypes = { referat: PropTypes.object, narmestelederId: PropTypes.string };

export default MotereferatContent;
