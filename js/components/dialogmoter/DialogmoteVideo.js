import React from 'react';
import Video from '../app/Video';
import src from '../../../video/dialogmote.mp4';
import captionSrc from '../../../videosubtitle/dialogmote.vtt';
import poster from '../../../img/video/dialogmote.jpg';

export const DIALOGMOTE_FILM_FILES = {
  src,
  captionSrc,
  poster,
};

const texts = {
  title: 'Om dialogmøter',
};

const DialogmoteVideo = () => {
  return (
    <div className="panel">
      <h2 className="panel__tittel">{texts.title}</h2>
      <Video film={DIALOGMOTE_FILM_FILES} />
    </div>
  );
};

export default DialogmoteVideo;
