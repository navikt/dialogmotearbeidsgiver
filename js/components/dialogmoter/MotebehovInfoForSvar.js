import React from 'react';
import PropTypes from 'prop-types';
import { hentOppfolgingsplanarbeidsgiverUrl } from '../../utils/urlUtils';

/* eslint-disable max-len */
export const TEKSTER = {
    forDuSvarer: {
        tittel: 'Før du svarer',
        lagetPlan: 'Har dere laget en oppfølgingsplan? Husk å dele den med NAV nå.',
        ikkeLagetPlan: 'Er oppfølgingsplanen ikke laget?',
    },
    tekstInformasjonInnhold: {
        lenke: 'Opprett en ny plan.',
    },
};
/* eslint-enable max-len */

export const TekstInformasjonBilde = () => {
    return (<div className="tekstInformasjon__bilde">
        <img src={`${process.env.REACT_APP_CONTEXT_ROOT}/img/svg/forDuSvarer.svg`} alt="Kalender" />
    </div>);
};

export const TekstInformasjonInnhold = ({ koblingId }) => {
    return (<div className="tekstInformasjon__innhold">
        <h2 className="tekstInformasjon__tittel">
            {TEKSTER.forDuSvarer.tittel}
        </h2>
        <ul>
            <li>{TEKSTER.forDuSvarer.lagetPlan}</li>
            <li>
                {TEKSTER.forDuSvarer.ikkeLagetPlan}
                {' '}
                <a className="lenke" href={hentOppfolgingsplanarbeidsgiverUrl(koblingId)}>
                    {TEKSTER.tekstInformasjonInnhold.lenke}
                </a>
            </li>
        </ul>
    </div>);
};
TekstInformasjonInnhold.propTypes = {
    koblingId: PropTypes.number,
};

const MotebehovInfoForSvar = ({ koblingId }) => {
    return (<div className="panel motebehovInfoForSvar">
        <TekstInformasjonBilde />
        <TekstInformasjonInnhold koblingId={koblingId} />
    </div>);
};
MotebehovInfoForSvar.propTypes = {
    koblingId: PropTypes.number,
};

export default MotebehovInfoForSvar;
