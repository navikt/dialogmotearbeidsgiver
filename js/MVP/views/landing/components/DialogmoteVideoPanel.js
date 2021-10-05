import React from 'react';
import styled from 'styled-components';
import Video from '../../../../components/app/Video';
import DialogmotePanel from '../../../containers/DialogmotePanel';
import src from '../../../../../video/dialogmote.mp4';
import captionSrc from '../../../../../videosubtitle/dialogmote.vtt';
import poster from '../../../../../img/video/dialogmote.jpg';

export const DIALOGMOTE_FILM_FILES = {
  src,
  captionSrc,
  poster,
};

const DialogmotePanelStyled = styled(DialogmotePanel)`
  margin: 32px 0;
`;

const texts = {
  title: 'Om dialogmøter',
};

const DialogmoteVideoPanel = () => {
  return (
    <DialogmotePanelStyled title={texts.title}>
      <Video film={DIALOGMOTE_FILM_FILES} />
    </DialogmotePanelStyled>
  );
};

export default DialogmoteVideoPanel;
