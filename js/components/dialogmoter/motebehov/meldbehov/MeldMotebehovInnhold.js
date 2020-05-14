import React from 'react';
import PropTypes from 'prop-types';
import {
    motebehovReducerPt,
    motebehovSvarReducerPt,
    sykmeldt as sykmeldtPt,
} from '../../../../propTypes';
import { harBrukerSvartPaMotebehovINyesteOppfolgingstilfelle } from '../../../../utils/motebehovUtils';
import MeldMotebehovKvittering from './MeldMotebehovKvittering';
import MeldMotebehovSkjema from './MeldMotebehovSkjema';

const MotebehovInnholdMeldBehov = (
    {
        actions,
        sykmeldt,
        motebehov,
        motebehovSvarReducer,
    }) => {
    return harBrukerSvartPaMotebehovINyesteOppfolgingstilfelle(motebehov)
        ? <MeldMotebehovKvittering
            koblingId={sykmeldt.koblingId}
            motebehov={motebehov}
        />
        : (<MeldMotebehovSkjema
            sykmeldt={sykmeldt}
            motebehovSvarReducer={motebehovSvarReducer}
            svarMotebehov={actions.svarMotebehov}
        />);
};
MotebehovInnholdMeldBehov.propTypes = {
    actions: PropTypes.shape({
        hentMotebehov: PropTypes.func,
        svarMotebehov: PropTypes.func,
    }),
    sykmeldt: sykmeldtPt,
    motebehov: motebehovReducerPt,
    motebehovSvarReducer: motebehovSvarReducerPt,
};

export default MotebehovInnholdMeldBehov;
