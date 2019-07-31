import * as actiontyper from '../actions/actiontyper';

export default function lightbox(state = { vis: false }, action = {}) {
    switch (action.type) {
        case actiontyper.VIS_LIGHTBOX: {
            return {
                vis: true,
                children: action.children,
                trigger: action.trigger,
            };
        }
        case actiontyper.LUKK_LIGHTBOX:
        case actiontyper.SYKMELDT_SLETTET: {
            if (state.trigger && state.trigger.focus) {
                state.trigger.focus();
            }
            return {
                vis: false,
            };
        }
        default: {
            return state;
        }
    }
}
