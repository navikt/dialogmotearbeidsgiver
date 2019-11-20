import React from 'react';

/* eslint-disable max-len */
const texts = {
    title: 'Status',
    subTitle: 'De foreslåtte tidspunktene er passert',
    explanation: 'Du har tidligere mottatt en møteforespørsel med tidspunkter for et dialogmøte med NAV og din arbeidstaker. Møteforespørselen er utdatert, og du kan se bort fra denne forespørselen. Er det fortsatt aktuelt med et møte, vil du få en ny forespørsel.',
    contactInfo: 'Har du spørsmål, kan du kontakte oss på 55 55 33 36',
};
/* eslint-enable max-len */

const MotePassert = () => {
    return (<div>
        <header className="sidetopp">
            <h1 className="sidetopp__tittel">{texts.title}</h1>
        </header>
        <div className="panel">
            <div className="illustrertTittel">
                <img
                    className="illustrertTittel__img"
                    src={`${process.env.REACT_APP_CONTEXT_ROOT}/img/svg/mote_avbrutt.svg`}
                    alt=""
                />
                <h2 className="illustrertTittel__tittel" >{texts.subTitle}</h2>
            </div>
            <p>{texts.explanation}</p>
            <div className="adskilt__blokk blokk">
                <p>{texts.contactInfo}</p>
            </div>
        </div>
    </div>);
};

export default MotePassert;
