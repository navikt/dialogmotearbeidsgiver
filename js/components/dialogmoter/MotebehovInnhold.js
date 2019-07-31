import React from 'react';
import PropTypes from 'prop-types';
import {
    getLedetekst,
    sykeforlopsPerioderReducerPt,
} from '@navikt/digisyfo-npm';
import {
    sykmeldt as sykmeldtPt,
    motebehovReducerPt,
    motebehovSvarReducerPt,
} from '../../propTypes';
import Sidetopp from '../Sidetopp';
import MotebehovSvar from './MotebehovSvar';
import MotebehovKvittering from './MotebehovKvittering';
import { harBrukerSvartPaMotebehovINyesteOppfolgingstilfelle } from '../../utils/motebehovUtils';

const MotebehovInnhold = (
    {
        actions,
        sykeforlopsPerioder,
        sykmeldt,
        motebehov,
        motebehovSvarReducer,
    }) => {
    const innhold = harBrukerSvartPaMotebehovINyesteOppfolgingstilfelle(motebehov, sykeforlopsPerioder, sykmeldt)
        ? <MotebehovKvittering motebehov={motebehov} />
        : (<MotebehovSvar
            sykmeldt={sykmeldt}
            motebehovSvarReducer={motebehovSvarReducer}
            svarMotebehov={actions.svarMotebehov}
        />);
    return (<div className="motebehovSideInnhold">
        <Sidetopp tittel={getLedetekst('mote.motebehov.sidetittel')} />

        { innhold }
    </div>);
};
MotebehovInnhold.propTypes = {
    actions: PropTypes.shape({
        hentMotebehov: PropTypes.func,
        svarMotebehov: PropTypes.func,
    }),
    sykeforlopsPerioder: sykeforlopsPerioderReducerPt,
    sykmeldt: sykmeldtPt,
    motebehov: motebehovReducerPt,
    motebehovSvarReducer: motebehovSvarReducerPt,
};

export default MotebehovInnhold;
