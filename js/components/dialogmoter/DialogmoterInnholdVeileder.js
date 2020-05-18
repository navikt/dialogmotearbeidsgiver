import React from 'react';
import Veileder from 'nav-frontend-veileder';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import VeilederSvg from './VeilederSvg';

const VeilederStyled = styled(Veileder)`
    margin-bottom: 1rem;  
    .nav-veileder__snakkeboblePil {
        border-right: 1.25rem solid white;
    }
    .nav-veileder__snakkeboble {
        background: white;
    }
`;

const texts = {
    paragraph: `
    I et dialogmøte går vi gjennom situasjonen og planlegger veien videre.
    De som deltar, er du, den ansatte og en veileder fra NAV-kontoret, eventuelt også den som sykmelder den ansatte.
    `,
    link: 'Les mer om dialogmøter',
};

const textParagraph1 = (arbeidstakerName) => {
    return `Har du behov for et dialogmøte med NAV og ${arbeidstakerName}?`;
};

const DialogmoterInnholdVeilederText = ({ arbeidstakerName }) => {
    return (
        <React.Fragment>
            {textParagraph1(arbeidstakerName)}
            <br />
            {texts.paragraph}
            <br />
            <a className="lenke" href="https://www.nav.no/no/bedrift/oppfolging/sykmeldt-arbeidstaker/relatert-informasjon/slik-folger-du-opp-sykmeldte/dialogmote-2-og-3-nav_kap">
                {texts.link}
            </a>
        </React.Fragment>
    );
};
DialogmoterInnholdVeilederText.propTypes = {
    arbeidstakerName: PropTypes.string,
};

const DialogmoterInnholdVeileder = ({ arbeidstakerName }) => {
    return (
        <VeilederStyled className="dialogmoterInnholdVeileder" tekst={<DialogmoterInnholdVeilederText arbeidstakerName={arbeidstakerName} />} posisjon="høyre">
            <VeilederSvg />
        </VeilederStyled>
    );
};
DialogmoterInnholdVeileder.propTypes = {
    arbeidstakerName: PropTypes.string,
};

export default DialogmoterInnholdVeileder;
