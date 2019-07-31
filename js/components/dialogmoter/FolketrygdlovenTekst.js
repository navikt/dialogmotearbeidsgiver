import React from 'react';
import { getHtmlLedetekst } from '@navikt/digisyfo-npm';

const FolketrygdlovenTekst = () => {
    return (<div className="panel folketrygdlovenTekst">
        <p dangerouslySetInnerHTML={getHtmlLedetekst('sykefravaerarbeidsgiver.folketrygdlovenTekst.tekst')} />
    </div>);
};

export default FolketrygdlovenTekst;
