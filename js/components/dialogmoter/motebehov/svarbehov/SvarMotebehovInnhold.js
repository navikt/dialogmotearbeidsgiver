import React from 'react';
import PropTypes from 'prop-types';
import {
    motebehovReducerPt,
    motebehovSvarReducerPt,
    sykmeldt as sykmeldtPt,
} from '../../../../propTypes';
import { harBrukerSvartPaMotebehovINyesteOppfolgingstilfelle } from '../../../../utils/motebehovUtils';
import MotebehovSvar from './MotebehovSvar';
import MotebehovKvittering from './MotebehovKvittering';

const MotebehovInnholdSvarBehov = (
    {
        actions,
        sykmeldt,
        motebehov,
        motebehovSvarReducer,
    }) => {
    return harBrukerSvartPaMotebehovINyesteOppfolgingstilfelle(motebehov)
        ? <MotebehovKvittering motebehov={motebehov} />
        : (<MotebehovSvar
            sykmeldt={sykmeldt}
            motebehovSvarReducer={motebehovSvarReducer}
            svarMotebehov={actions.svarMotebehov}
        />);
};
MotebehovInnholdSvarBehov.propTypes = {
    actions: PropTypes.shape({
        hentMotebehov: PropTypes.func,
        svarMotebehov: PropTypes.func,
    }),
    sykmeldt: sykmeldtPt,
    motebehov: motebehovReducerPt,
    motebehovSvarReducer: motebehovSvarReducerPt,
};

export default MotebehovInnholdSvarBehov;
