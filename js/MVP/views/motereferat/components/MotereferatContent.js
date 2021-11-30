import { trackOnClick } from '@/amplitude/amplitude';
import { eventNames } from '@/amplitude/events';
import VeilederSpeechBubble from '@/MVP/components/VeilederSpeechBubble';
import { pdfTypes } from '@/MVP/globals/constants';
import { Download as DownloadIcon } from '@navikt/ds-icons';
import { Knapp } from 'nav-frontend-knapper';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components';
import DocumentContainer from '../../../containers/DocumentContainer';
import { downloadBrevPdf, getProgrammaticDateFormat } from '../../../utils';
import LinkInfoBox from './LinkInfoBox';
import NoReferatAlert from './NoReferatAlert';
import VeilederReferatContent from './VeilederReferatContent';

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
  const { uuid, document, tid, lestDato } = referat;

  return (
    <React.Fragment>
      <DocumentContainer document={document} brevUuid={uuid} lestDato={lestDato} />

      <KnappStyled
        onClick={() => {
          handleClick(uuid, getProgrammaticDateFormat(tid));
          trackOnClick(eventNames.lastNedReferat);
        }}
        autoDisableVedSpinner
        spinner={downloadingPDF}
        mini
      >
        <DownloadIcon />
        <span>{texts.button}</span>
      </KnappStyled>

      <LinkInfoBox documentKeys={getDocumentKeys(document)} />
      <VeilederSpeechBubble content={<VeilederReferatContent />} />
    </React.Fragment>
  );
};

MotereferatContent.propTypes = { referat: PropTypes.object };

export default MotereferatContent;
