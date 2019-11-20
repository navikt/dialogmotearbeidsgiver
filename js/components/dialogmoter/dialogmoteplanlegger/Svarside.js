import React from 'react';
import Alertstripe from 'nav-frontend-alertstriper';
import { getLedetekst } from '@navikt/digisyfo-npm';
import Svarskjema from './Svarskjema';
import { motePt } from '../../../propTypes';
import {
    BEKREFTET,
    finnNyesteAlternativ,
} from '../../../utils/moteplanleggerUtils';
import { visKortDato } from '../../../utils/datoUtils';

const Svarside = (props) => {
    const {
        mote,
    } = props;

    return (<div>
        <header className="sidetopp">
            <h1 className="sidetopp__tittel">{getLedetekst('mote.svarside.tittel')}</h1>
        </header>
        { mote.status === BEKREFTET &&
        <div className="blokk panel">
            <Alertstripe
                type="info"
                className="panel">
                <p className="uthevet">{getLedetekst('mote.svarside.tidligere.bekreftet.info')}</p>
                <span>
                    {getLedetekst('mote.svarside.tidligere.bekreftet.sendtdato', {
                        '%BEKREFTET_DATO%': visKortDato(finnNyesteAlternativ(mote.alternativer).created),
                    })}
                </span>
            </Alertstripe>
        </div>
        }
        <Svarskjema {...props} />
    </div>);
};

Svarside.propTypes = {
    mote: motePt,
};

export default Svarside;
