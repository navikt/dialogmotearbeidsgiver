import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Knapp } from 'nav-frontend-knapper';
import { useMutateBrevLest } from '../../../queries/brev';
import { pdfTypes } from '../../../globals/constants';
import NoReferatAlert from './NoReferatAlert';
import { downloadBrevPdf, getProgrammaticDateFormat } from '../../../utils';
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
    if (!referat.lestDato && !mutation.isLoading) {
      const brevUuid = referat.uuid;
      mutation.mutate({ narmestelederId, brevUuid });
    }
  }, [mutation, narmestelederId, referat.lestDato, referat.uuid]);

  const handleClick = async (uuid, dokumentDato) => {
    setDownloadingPDF(true);
    try {
      await downloadBrevPdf(uuid, dokumentDato, pdfTypes.REFERAT);
    } finally {
      setDownloadingPDF(false);
    }
  };

  if (!referat) {
    return <NoReferatAlert />;
  }
  const { uuid, document, tid } = referat;

  return (
    <React.Fragment>
      <DocumentContainer document={document} />

      <KnappStyled
        onClick={() => handleClick(uuid, getProgrammaticDateFormat(tid))}
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

MotereferatContent.propTypes = { referat: PropTypes.object, narmestelederId: PropTypes.string };

export default MotereferatContent;
