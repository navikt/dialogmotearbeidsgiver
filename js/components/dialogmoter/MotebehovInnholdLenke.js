import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import {
    getLedetekst,
    keyValue,
    sykeforlopsPerioderReducerPt,
} from '@navikt/digisyfo-npm';
import {
    motebehovReducerPt,
    sykmeldt as sykmeldtPt,
} from '../../propTypes';
import { harBrukerSvartPaMotebehovINyesteOppfolgingstilfelle } from '../../utils/motebehovUtils';

const MotebehovInnholdLenke = (
    {
        ledetekster,
        koblingId,
        motebehov,
        sykeforlopsPerioder,
        sykmeldt,
    }) => {
    const knappTekstNokkel = harBrukerSvartPaMotebehovINyesteOppfolgingstilfelle(motebehov, sykeforlopsPerioder, sykmeldt)
        ? 'mote.motebehovInnholdLenke.knapp.kvittering'
        : 'mote.motebehovInnholdLenke.knapp.svar';
    return (<div className="motebehovInnholdLenke panel">
        <h2 className="panel__tittel">{getLedetekst('mote.motebehovInnholdLenke.tittel', ledetekster)}</h2>
        <p>{getLedetekst('mote.motebehovInnholdLenke.tekst', ledetekster)}</p>
        <Link
            className="knapp"
            to={`${process.env.REACT_APP_CONTEXT_ROOT}/${koblingId}/behov`}
        >
            {getLedetekst(knappTekstNokkel, ledetekster)}
        </Link>
    </div>);
};
MotebehovInnholdLenke.propTypes = {
    ledetekster: keyValue,
    koblingId: PropTypes.string,
    motebehov: motebehovReducerPt,
    sykeforlopsPerioder: sykeforlopsPerioderReducerPt,
    sykmeldt: sykmeldtPt,
};

export default MotebehovInnholdLenke;
