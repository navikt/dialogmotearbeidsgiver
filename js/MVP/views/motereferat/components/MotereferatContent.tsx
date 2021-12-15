import { trackOnClick } from '@/amplitude/amplitude';
import { eventNames } from '@/amplitude/events';
import { Brev, DocumentComponent } from '@/api/types/brevTypes';
import VeilederSpeechBubble from '@/MVP/components/VeilederSpeechBubble';
import { pdfTypes } from '@/MVP/globals/constants';
import { downloadBrevPdf } from '@/MVP/utils/browserUtils';
import { getProgrammaticDateFormat } from '@/MVP/utils/dateUtils';
import { Download as DownloadIcon } from '@navikt/ds-icons';
import { Knapp } from 'nav-frontend-knapper';
import React, { useState } from 'react';
import styled from 'styled-components';
import DocumentContainer from '../../../containers/DocumentContainer';
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

const getDocumentKeys = (document: DocumentComponent[]): string[] => {
  return document.map(({ key }) => key).filter((element): element is string => !!element);
};

const MotereferatContent = ({ referat }: { referat: Brev }) => {
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

export default MotereferatContent;
