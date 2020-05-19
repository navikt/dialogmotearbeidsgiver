import React from 'react';
import Video from '../app/Video';

export const DIALOGMOTE_FILM_FILES = {
    src: `${process.env.REACT_APP_CONTEXT_ROOT}/resources/video/dialogmote.mp4`,
    captionSrc: `${process.env.REACT_APP_CONTEXT_ROOT}/resources/videosubtitle/dialogmote.vtt`,
    poster: `${process.env.REACT_APP_CONTEXT_ROOT}/img/video/dialogmote.jpg`,
};

const texts = {
    title: 'Om dialogmøter',
};

const DialogmoteVideo = () => {
    return (
        <div className="panel">
            <h2 className="panel__tittel">
                {texts.title}
            </h2>
            <Video film={DIALOGMOTE_FILM_FILES} />
        </div>
    );
};

export default DialogmoteVideo;
