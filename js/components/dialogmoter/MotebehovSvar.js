import React from 'react';
import PropTypes from 'prop-types';
import {
    getLedetekst,
    Bjorn,
} from '@navikt/digisyfo-npm';
import {
    sykmeldt as sykmeldtPt,
    motebehovSvarReducerPt,
} from '../../propTypes';
import SvarMotebehovSkjema from './SvarMotebehovSkjema';
import MotebehovInfoForSvar from './MotebehovInfoForSvar';
import FolketrygdlovenTekst from './FolketrygdlovenTekst';

const MotebehovSvar = (
    {
        sykmeldt,
        motebehovSvarReducer,
        svarMotebehov,
    }) => {
    return (<div className="motebehovSvar">
        <Bjorn
            rootUrl={process.env.REACT_APP_CONTEXT_ROOT}
            hvit
            stor>
            <p>{getLedetekst('sykefravaerarbeidsgiver.motebehovSvar.bjornTekst')}</p>
        </Bjorn>

        <MotebehovInfoForSvar koblingId={sykmeldt.koblingId} />

        <FolketrygdlovenTekst />

        <SvarMotebehovSkjema
            sykmeldt={sykmeldt}
            motebehovSvarReducer={motebehovSvarReducer}
            svarMotebehov={svarMotebehov}
        />
    </div>);
};
MotebehovSvar.propTypes = {
    sykmeldt: sykmeldtPt,
    motebehovSvarReducer: motebehovSvarReducerPt,
    svarMotebehov: PropTypes.func,
};

export default MotebehovSvar;
