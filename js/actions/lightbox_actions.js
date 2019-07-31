import * as actiontyper from './actiontyper';

export function visLightbox(children, trigger) {
    return {
        type: actiontyper.VIS_LIGHTBOX,
        children,
        trigger,
    };
}

export function lukkLightbox() {
    return {
        type: actiontyper.LUKK_LIGHTBOX,
    };
}
