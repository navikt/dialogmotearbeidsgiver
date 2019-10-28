import React from 'react';
import { motebehovReducerPt } from '../../../propTypes';

const texts = {
    konklusjon: `
        Vi har konkludert med at det bør holdes dialogmøte selv om du tidligere har svart nei på behovet. 
        Vi har sett på svarene fra deg og arbeidsgiveren din og på andre opplysninger vi har om sykefraværet.
    `,
};

const DeclinedMotebehov = ({ motebehovReducer }) => {
    if (motebehovReducer.data.find((behov) => { return !behov.motebehovSvar.harMotebehov; })) {
        return (
            <div className="panel">
                {texts.konklusjon}
            </div>
        );
    }
    return null;
};

DeclinedMotebehov.propTypes = {
    motebehovReducer: motebehovReducerPt,
};

export default DeclinedMotebehov;
