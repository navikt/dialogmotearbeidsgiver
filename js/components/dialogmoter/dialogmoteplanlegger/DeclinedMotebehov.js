import React from 'react';

const texts = {
    konklusjon: `
        Vi har konkludert med at det bør holdes dialogmøte selv om du tidligere har svart nei på behovet. 
        Vi har sett på svarene fra deg og arbeidsgiveren din og på andre opplysninger vi har om sykefraværet.
    `,
};

const DeclinedMotebehov = () => {
    return (
        <div className="panel">
            {texts.konklusjon}
        </div>
    );
};

export default DeclinedMotebehov;
