import React from 'react';
import PropTypes from 'prop-types';
import {
    motebehovReducerPt,
    motebehovSvarReducerPt,
    sykmeldt as sykmeldtPt,
} from '../../../../propTypes';
import { harBrukerSvartPaMotebehovINyesteOppfolgingstilfelle } from '../../../../utils/motebehovUtils';
import MeldMotebehovSkjema from './MeldMotebehovSkjema';
import Sidetopp from '../../../Sidetopp';
import MeldMotebehovKvitteringSide from './MeldMotebehovSide';

const texts = {
    title: {
        default: 'Behov for dialogmøte',
        receipt: 'Kvittering',
    },
};

const MotebehovInnholdMeldBehov = (
    {
        svarMotebehov,
        sykmeldt,
        motebehov,
        motebehovSvarReducer,
    }) => {
    const isKvittering = harBrukerSvartPaMotebehovINyesteOppfolgingstilfelle(motebehov);
    const title = isKvittering
        ? texts.title.receipt
        : texts.title.default;
    const content = isKvittering
        ? (<MeldMotebehovKvitteringSide
            koblingId={sykmeldt.koblingId}
            motebehov={motebehov}
        />)
        : (<MeldMotebehovSkjema
            sykmeldt={sykmeldt}
            motebehovSvarReducer={motebehovSvarReducer}
            svarMotebehov={svarMotebehov}
        />);
    return (
        <React.Fragment>
            <Sidetopp tittel={title} />
            {content}
        </React.Fragment>
    );
};
MotebehovInnholdMeldBehov.propTypes = {
    svarMotebehov: PropTypes.func,
    sykmeldt: sykmeldtPt,
    motebehov: motebehovReducerPt,
    motebehovSvarReducer: motebehovSvarReducerPt,
};

export default MotebehovInnholdMeldBehov;
