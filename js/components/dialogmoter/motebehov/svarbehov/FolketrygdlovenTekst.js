import React from 'react';

/* eslint-disable max-len */
export const texts = {
    folketrygdloven: 'Ifølge folketrygdloven skal NAV innkalle til dialogmøte senest innen 26 ukers sykefravær, med mindre det er åpenbart unødvendig. Vi bruker opplysningene du gir her til å vurdere om det er behov for møte. ',
    lenke: 'Les om dialogmøte.',
};
/* eslint-enable max-len */

const FolketrygdlovenTekst = () => {
    return (
        <div className="panel folketrygdlovenTekst">
            <p>
                {texts.folketrygdloven}
                <a
                    className="lenke"
                    href="https://www.nav.no/no/bedrift/oppfolging/sykmeldt-arbeidstaker/relatert-informasjon/slik-folger-du-opp-sykmeldte/dialogmote-2-og-3-nav_kap"
                    title="Følg lenke">
                    {texts.lenke}
                </a>
            </p>
        </div>
    );
};

export default FolketrygdlovenTekst;
