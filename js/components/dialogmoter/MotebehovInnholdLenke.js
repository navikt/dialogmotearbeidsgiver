import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router';
import { motebehovReducerPt } from '../../propTypes';
import {
    harBrukerSvartPaMotebehovINyesteOppfolgingstilfelle,
    isSvarBehov,
} from '../../utils/motebehovUtils';

const TEKSTER = {
    tittel: 'Trenger dere et dialogmøte med NAV?',
    undertekst: 'Er det ikke behov for møte? Da trenger du ikke svare på denne.',
    knappKvittering: 'Se Kvittering',
    meldBehov: {
        knappBehov: 'Meld behov for møte',
    },
    svarBehov: {
        knappBehov: 'Vurder behov for møte',
    },
};

const MotebehovInnholdLenkeStyled = styled.div`
    text-align: center;
`;

const getTextLink = (motebehov) => {
    if (harBrukerSvartPaMotebehovINyesteOppfolgingstilfelle(motebehov)) {
        return TEKSTER.knappKvittering;
    } else if (isSvarBehov(motebehov)) {
        return TEKSTER.svarBehov.knappBehov;
    }
    return TEKSTER.meldBehov.knappBehov;
};

const MotebehovInnholdLenke = (
    {
        koblingId,
        motebehov,
    }) => {
    return (<MotebehovInnholdLenkeStyled className="motebehovInnholdLenke panel">
        <h2 className="panel__tittel">{TEKSTER.tittel}</h2>
        <p>{TEKSTER.undertekst}</p>
        <Link
            className="knapp knapp--hoved"
            to={`${process.env.REACT_APP_CONTEXT_ROOT}/${koblingId}/behov`}
        >
            {getTextLink(motebehov)}
        </Link>
    </MotebehovInnholdLenkeStyled>);
};
MotebehovInnholdLenke.propTypes = {
    koblingId: PropTypes.string,
    motebehov: motebehovReducerPt,
};

export default MotebehovInnholdLenke;
