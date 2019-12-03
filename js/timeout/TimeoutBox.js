import React from 'react';
import PropTypes from 'prop-types';
/* eslint-enable */
import { connect } from 'react-redux';
/* eslint-disable */
import Modal from 'nav-frontend-modal';
import { forlengInnloggetSesjon } from './timeout_actions';

const texts = {
    title: 'Jobber du fortsatt på denne?',
    paragraph: 'Det ser ut som du har vært inaktiv en stund. Av sikkerhetsgrunner kommer vi om kort til å logge deg ut dersom du ikke ønsker å bli på siden',
    buttonStay: 'Bli på siden',
    buttonLogout: 'Logg ut',
};

export const TimeoutBoxSide = ({ renewSession, brukerSnartUtlogget }) => {
    const appEl = document.getElementById('maincontent');
    Modal.setAppElement(appEl);

    return (
        <Modal isOpen={brukerSnartUtlogget} closeButton={false} contentLabel={texts.title}>
            <h2 className="panel__tittel">{texts.title}</h2>
            <p className="blokk">{texts.paragraph}</p>
            <div className="knapperad knapperad--forrigeNeste">
                <div className="knapperad__element">
                    <button type="button" className="knapp knapp--hoved" onClick={() => { renewSession(); }}>{texts.buttonStay}</button>
                </div>
                <div className="knapperad__element">
                    <a className="knapp" href="/esso/logout">{texts.buttonLogout}</a>
                </div>
            </div>
        </Modal>
    );
};

TimeoutBoxSide.propTypes = {
    renewSession: PropTypes.func,
    brukerSnartUtlogget: PropTypes.bool,
};

export function mapStateToProps(state) {
    return {
        brukerSnartUtlogget: state.timeout.brukerSnartUtlogget,
    };
}

const TimeoutBox = connect(mapStateToProps, {
    renewSession: forlengInnloggetSesjon
})(TimeoutBoxSide);

export default TimeoutBox;
