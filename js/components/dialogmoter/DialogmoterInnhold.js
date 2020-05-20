import React from 'react';
import PropTypes from 'prop-types';
import {
    motebehovReducerPt,
    sykmeldt as sykmeldtPt,
} from '../../propTypes';
import {
    harBrukerSvartPaMotebehovINyesteOppfolgingstilfelle,
    MOTEBEHOV_SKJEMATYPE,
} from '../../utils/motebehovUtils';
import Sidetopp from '../Sidetopp';
import DialogmoteVideo from './DialogmoteVideo';
import DialogmoterInnholdLenke from './DialogmoterInnholdLenke';
import MotebehovInnholdLenke from './MotebehovInnholdLenke';
import DialogmoterInnholdVeileder from './DialogmoterInnholdVeileder';
import SvarMotebehovKvittering from './motebehov/svarbehov/SvarMotebehovKvittering';
import MeldMotebehovKvittering from './motebehov/meldbehov/MeldMotebehovKvittering';

const texts = {
    title: 'Dialogmøter',
};

const MotebehovInnholdKvittering = (
    {
        koblingId,
        motebehov,
    }) => {
    const isKvittering = harBrukerSvartPaMotebehovINyesteOppfolgingstilfelle(motebehov);
    const skjemaType = motebehov.data.skjemaType;
    let content = React.Fragment;
    if (isKvittering) {
        if (skjemaType === MOTEBEHOV_SKJEMATYPE.MELD_BEHOV) {
            content = (
                <MeldMotebehovKvittering
                    koblingId={koblingId}
                    motebehov={motebehov}
                />
            );
        } else if (skjemaType === MOTEBEHOV_SKJEMATYPE.SVAR_BEHOV) {
            content = (
                <SvarMotebehovKvittering motebehov={motebehov} />
            );
        }
    } else {
        content = (
            <MotebehovInnholdLenke
                koblingId={koblingId}
                motebehov={motebehov}
            />
        );
    }
    return content;
};
MotebehovInnholdKvittering.propTypes = {
    koblingId: PropTypes.string,
    motebehov: motebehovReducerPt,
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
        <MotebehovInnholdKvittering
            koblingId={koblingId}
            motebehov={motebehov}
        />
        }

        { harMote &&
        <DialogmoterInnholdLenke
            koblingId={koblingId}
        />
        }
        <DialogmoteVideo />
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
