import React from 'react';
import PropTypes from 'prop-types';
import {
    sykmeldt as sykmeldtPt,
    motebehovReducerPt,
    motebehovSvarReducerPt,
} from '../../../propTypes';
import Sidetopp from '../../Sidetopp';
import MotebehovSvar from './svarbehov/MotebehovSvar';
import MotebehovKvittering from './svarbehov/MotebehovKvittering';
import { harBrukerSvartPaMotebehovINyesteOppfolgingstilfelle } from '../../../utils/motebehovUtils';

const texts = {
    title: 'Behov for dialogmøte',
};

const MotebehovInnhold = (
    {
        actions,
        sykmeldt,
        motebehov,
        motebehovSvarReducer,
    }) => {
    const innhold = harBrukerSvartPaMotebehovINyesteOppfolgingstilfelle(motebehov)
        ? <MotebehovKvittering motebehov={motebehov} />
        : (<MotebehovSvar
            sykmeldt={sykmeldt}
            motebehovSvarReducer={motebehovSvarReducer}
            svarMotebehov={actions.svarMotebehov}
        />);
    return (<div className="motebehovSideInnhold">
        <Sidetopp tittel={texts.title} />
        { innhold }
    </div>);
};
MotebehovInnhold.propTypes = {
    actions: PropTypes.shape({
        hentMotebehov: PropTypes.func,
        svarMotebehov: PropTypes.func,
    }),
    sykmeldt: sykmeldtPt,
    motebehov: motebehovReducerPt,
    motebehovSvarReducer: motebehovSvarReducerPt,
};

export default MotebehovInnhold;
