import React from 'react';
import PropTypes from 'prop-types';
import { sykeforlopsPerioderReducerPt } from '@navikt/digisyfo-npm';
import {
    motebehovReducerPt,
    sykmeldt as sykmeldtPt,
} from '../../propTypes';
import Sidetopp from '../Sidetopp';
import DialogmoterInnholdLenke from './DialogmoterInnholdLenke';
import MotebehovInnholdLenke from './MotebehovInnholdLenke';

const texts = {
    title: 'Dialogmøter',
};

const DialogmoterInnhold = (
    {
        koblingId,
        motebehov,
        sykeforlopsPerioder,
        sykmeldt,
        harMote,
        skalViseMotebehov,
    },
) => {
    return (<div className="dialogmoterInnhold">
        <Sidetopp tittel={texts.title} />

        { skalViseMotebehov &&
        <MotebehovInnholdLenke
            koblingId={koblingId}
            motebehov={motebehov}
            sykeforlopsPerioder={sykeforlopsPerioder}
            sykmeldt={sykmeldt}
        />
        }

        { harMote &&
        <DialogmoterInnholdLenke
            koblingId={koblingId}
        />
        }
    </div>);
};
DialogmoterInnhold.propTypes = {
    koblingId: PropTypes.string,
    motebehov: motebehovReducerPt,
    sykeforlopsPerioder: sykeforlopsPerioderReducerPt,
    sykmeldt: sykmeldtPt,
    harMote: PropTypes.bool,
    skalViseMotebehov: PropTypes.bool,
};

export default DialogmoterInnhold;
