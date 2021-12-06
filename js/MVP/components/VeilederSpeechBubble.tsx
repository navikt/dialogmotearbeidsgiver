import React, { ReactElement } from 'react';
import styled from 'styled-components';
import Veileder from 'nav-frontend-veileder';
import { VeilederAvatarImage } from '@/MVP/images';

const VeilederStyled = styled(Veileder)`
  max-width: 576px;
  align-self: center;
  margin: 64px 0;
`;

interface Props {
  content: ReactElement;
}

function VeilederSpeechBubble({ content }: Props): ReactElement {
  return (
    <VeilederStyled tekst={content} posisjon="høyre" storrelse="S" fargetema="info" hvitSnakkeboble>
      <img src={VeilederAvatarImage} />
    </VeilederStyled>
  );
}

export default VeilederSpeechBubble;
