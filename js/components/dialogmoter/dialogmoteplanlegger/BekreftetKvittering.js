import React from 'react';
import { motePt } from '../../../propTypes';
import {
    visDato,
    visKlokkeslett,
} from '../../../utils/datoUtils';
import { ARBEIDSGIVER } from '../../../enums/moteplanleggerDeltakerTyper';

const texts = {
    title: 'Møtebekreftelse',
    hello: 'Hei',
    paragraphCall: 'Har du spørsmål kan du kontakte oss på 55 55 33 36',
    paragraphHilsen: 'Vennlig hilsen NAV',
};

const getTextParagraphIntro = (tidsted) => {
    return `Vi bekrefter møtetidspunkt ${tidsted}. Du vil om kort tid få en innkalling i posten med mer informasjon om dialogmøtet.`;
};

const Kvittering = (
    {
        mote,
    }) => {
    const tidsted = `${visDato(mote.bekreftetAlternativ.tid).toLowerCase()} kl. ${visKlokkeslett(mote.bekreftetAlternativ.tid)} i ${mote.bekreftetAlternativ.sted}`;
    const innloggetBruker = mote.deltakere.filter((deltaker) => {
        return deltaker.type === ARBEIDSGIVER;
    })[0];

    return (<div>
        <header className="sidetopp">
            <h1 className="sidetopp__tittel">{texts.title}</h1>
        </header>
        <div className="panel">
            <h2>{texts.hello} {innloggetBruker.navn}</h2>
            <div className="blokk">
                <p>{getTextParagraphIntro(tidsted)}</p>
                <p>{texts.paragraphCall}</p>
                <p>{texts.paragraphHilsen}</p>
            </div>
        </div>
    </div>);
};

Kvittering.propTypes = {
    mote: motePt,
};

export default Kvittering;
