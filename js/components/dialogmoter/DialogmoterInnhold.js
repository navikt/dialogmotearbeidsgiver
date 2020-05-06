import React from 'react';
import PropTypes from 'prop-types';
import { motebehovReducerPt } from '../../propTypes';
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
    harMote: PropTypes.bool,
    skalViseMotebehov: PropTypes.bool,
};

export default DialogmoterInnhold;
