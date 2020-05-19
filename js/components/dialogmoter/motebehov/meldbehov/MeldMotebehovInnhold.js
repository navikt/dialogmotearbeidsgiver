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
import Sidetopp from '../../../Sidetopp';

const texts = {
    title: {
        default: 'Behov for dialogmøte',
        receipt: 'Kvittering',
    },
};

const MotebehovInnholdMeldBehov = (
    {
        actions,
        sykmeldt,
        motebehov,
        motebehovSvarReducer,
    }) => {
    const isKvittering = harBrukerSvartPaMotebehovINyesteOppfolgingstilfelle(motebehov);
    const title = isKvittering
        ? texts.title.receipt
        : texts.title.default;
    const content = isKvittering
        ? (<MeldMotebehovKvittering
            koblingId={sykmeldt.koblingId}
            motebehov={motebehov}
        />)
        : (<MeldMotebehovSkjema
            sykmeldt={sykmeldt}
            motebehovSvarReducer={motebehovSvarReducer}
            svarMotebehov={actions.svarMotebehov}
        />);
    return (
        <React.Fragment>
            <Sidetopp tittel={title} />
            {content}
        </React.Fragment>
    );
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
