import React from 'react';
import { motebehovReducerPt } from '../../../../propTypes';
import SvarMotebehovKvittering from './SvarMotebehovKvittering';
import MotebehovKvitteringSideButtonBack from '../MotebehovKvitteringSideButtonBack';

const SvarMotebehovKvitteringSide = (
    {
        motebehov,
    }) => {
    return (<div>
        <SvarMotebehovKvittering
            motebehov={motebehov}
        />
        <MotebehovKvitteringSideButtonBack />
    </div>);
};
SvarMotebehovKvitteringSide.propTypes = {
    motebehov: motebehovReducerPt,
};

export default SvarMotebehovKvitteringSide;
