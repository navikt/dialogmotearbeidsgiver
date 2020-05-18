import React from 'react';
import PropTypes from 'prop-types';
import {
    motebehovReducerPt,
    sykmeldt as sykmeldtPt,
} from '../../propTypes';
import Sidetopp from '../Sidetopp';
import DialogmoterInnholdLenke from './DialogmoterInnholdLenke';
import MotebehovInnholdLenke from './MotebehovInnholdLenke';
import DialogmoterInnholdVeileder from './DialogmoterInnholdVeileder';

const texts = {
    title: 'Dialogmøter',
};

const DialogmoterInnhold = (
    {
        sykmeldt,
        koblingId,
        motebehov,
        harMote,
        skalViseMotebehov,
    },
) => {
    return (<div className="dialogmoterInnhold">
        <Sidetopp tittel={texts.title} />

        <DialogmoterInnholdVeileder
            arbeidstakerName={sykmeldt.navn}
        />

        { skalViseMotebehov &&
        <MotebehovInnholdLenke
            koblingId={koblingId}
            motebehov={motebehov}
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
    sykmeldt: sykmeldtPt,
    koblingId: PropTypes.string,
    motebehov: motebehovReducerPt,
    harMote: PropTypes.bool,
    skalViseMotebehov: PropTypes.bool,
};

export default DialogmoterInnhold;
