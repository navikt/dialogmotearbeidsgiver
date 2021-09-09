import React from 'react';
import styled from 'styled-components';
import Video from '../../../../components/app/Video';
import DialogmotePanel from '../../../containers/DialogmotePanel';

const DialogmotePanelStyled = styled(DialogmotePanel)`
  margin: 32px 0;
`;

const texts = {
  title: 'Om dialogmøter',
};

const DIALOGMOTE_FILM_FILES = {
  src: `${process.env.REACT_APP_CONTEXT_ROOT}/resources/video/dialogmote.mp4`,
  captionSrc: `${process.env.REACT_APP_CONTEXT_ROOT}/resources/videosubtitle/dialogmote.vtt`,
  poster: `${process.env.REACT_APP_CONTEXT_ROOT}/img/video/dialogmote.jpg`,
};

const DialogmoteVideoPanel = () => {
  return (
    <DialogmotePanelStyled title={texts.title}>
      <Video film={DIALOGMOTE_FILM_FILES} />
    </DialogmotePanelStyled>
  );
};

export default DialogmoteVideoPanel;
