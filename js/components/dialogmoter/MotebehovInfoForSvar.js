import React from 'react';
import PropTypes from 'prop-types';
import {
    getLedetekst,
} from '@navikt/digisyfo-npm';
import { hentOppfolgingsplanarbeidsgiverUrl } from '../../utils/urlUtils';

export const TekstInformasjonBilde = () => {
    return (<div className="tekstInformasjon__bilde">
        <img src={`${process.env.REACT_APP_CONTEXT_ROOT}/img/svg/forDuSvarer.svg`} alt="Kalender" />
    </div>);
};

export const TekstInformasjonInnhold = ({ koblingId }) => {
    return (<div className="tekstInformasjon__innhold">
        <h2 className="tekstInformasjon__tittel">
            {getLedetekst('sykefravaerarbeidsgiver.motebehovInfoForSvar.tekstInformasjonInnhold.tittel')}
        </h2>
        <ul>
            <li>{getLedetekst('sykefravaerarbeidsgiver.motebehovInfoForSvar.tekstInformasjonInnhold.lagetPlan')}</li>
            <li>
                {`${getLedetekst('sykefravaerarbeidsgiver.motebehovInfoForSvar.tekstInformasjonInnhold.ikkeLagetPlan')} `}
                <a className="lenke" href={hentOppfolgingsplanarbeidsgiverUrl(koblingId)}>
                    {getLedetekst('sykefravaerarbeidsgiver.motebehovInfoForSvar.tekstInformasjonInnhold.ikkeLagetPlan.lenke')}
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
