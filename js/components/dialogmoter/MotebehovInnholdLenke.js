import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router';
import { motebehovReducerPt } from '../../propTypes';
import { harBrukerSvartPaMotebehovINyesteOppfolgingstilfelle } from '../../utils/moteUtils';

const TEKSTER = {
    tittel: 'Trenger dere et dialogmøte med NAV?',
    undertekst: 'I møtet går vi gjennom situasjonen sammen og ser på muligheter.',
    knappKvittering: 'Se Kvittering',
    knappBehov: 'Vurder behov for møte',
};

const MotebehovInnholdLenkeStyled = styled.div`
    text-align: center;
`;

const MotebehovInnholdLenke = (
    {
        koblingId,
        motebehov,
    }) => {
    const knappTekstNokkel = harBrukerSvartPaMotebehovINyesteOppfolgingstilfelle(motebehov)
        ? TEKSTER.knappKvittering
        : TEKSTER.knappBehov;
    return (<MotebehovInnholdLenkeStyled className="motebehovInnholdLenke panel">
        <h2 className="panel__tittel">{TEKSTER.tittel}</h2>
        <p>{TEKSTER.undertekst}</p>
        <Link
            className="knapp knapp--hoved"
            to={`${process.env.REACT_APP_CONTEXT_ROOT}/${koblingId}/behov`}
        >
            {knappTekstNokkel}
        </Link>
    </MotebehovInnholdLenkeStyled>);
};
MotebehovInnholdLenke.propTypes = {
    koblingId: PropTypes.string,
    motebehov: motebehovReducerPt,
};

export default MotebehovInnholdLenke;
