import React from 'react';
import PropTypes from 'prop-types';
import {
    motebehovReducerPt,
    motebehovSvarReducerPt,
    sykmeldt as sykmeldtPt,
} from '../../../../propTypes';
import { harBrukerSvartPaMotebehovINyesteOppfolgingstilfelle } from '../../../../utils/motebehovUtils';
import MotebehovSvar from './MotebehovSvar';
import SvarMotebehovKvitteringSide from './SvarMotebehovKvitteringSide';
import Sidetopp from '../../../Sidetopp';

const texts = {
    title: {
        default: 'Behov for dialogmøte',
        receipt: 'Kvittering',
    },
};

const MotebehovInnholdSvarBehov = (
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
        ? <SvarMotebehovKvitteringSide motebehov={motebehov} />
        : (<MotebehovSvar
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
MotebehovInnholdSvarBehov.propTypes = {
    svarMotebehov: PropTypes.func,
    sykmeldt: sykmeldtPt,
    motebehov: motebehovReducerPt,
    motebehovSvarReducer: motebehovSvarReducerPt,
};

export default MotebehovInnholdSvarBehov;
