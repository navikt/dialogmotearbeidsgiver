import React, { ReactElement } from 'react';
import { getContextRoot } from '@/routers/paths';
import { getSykefravaerarbeidsgiverUrl } from '@/utils/urlUtils';
import personImage from '../../img/svg/person.svg';
import { eventNames } from '@/amplitude/events';
import { Link } from 'react-router-dom';
import { trackOnClick } from '@/amplitude/amplitude';
import Lenke from 'nav-frontend-lenker';

const texts = {
  personImageAltText: 'Du',
};

export interface BrodsmuleProps {
  sti: string;
  tittel: string;
  sisteSmule: boolean;
  erKlikkbar: boolean;
}

const Brodsmule = ({ sti, tittel, sisteSmule, erKlikkbar }: BrodsmuleProps): ReactElement => {
  const nySti = sti?.indexOf('/arbeidsgiver/sykmeldte') > -1 ? getSykefravaerarbeidsgiverUrl(sti) : sti;
  const root = sti?.indexOf('/arbeidsgiver/sykmeldte') > -1 ? '' : getContextRoot();
  const link =
    root === '' ? (
      <Lenke
        className="js-smule js-smule-a brodsmuler__smule"
        href={root + nySti}
        onClick={() => trackOnClick(eventNames.brodsmule)}
      >
        {tittel}
      </Lenke>
    ) : (
      <Link className="js-smule brodsmuler__smule" to={root + nySti} onClick={() => trackOnClick(eventNames.brodsmule)}>
        {tittel}
      </Link>
    );
  if (sisteSmule) {
    return (
      <span className="js-smuletekst">
        <span className="vekk">Du er her:</span> <span className="brodsmule">{tittel}</span>
      </span>
    );
  } else if (erKlikkbar) {
    return (
      <span className="js-smuletekst">
        {link}
        <span className="brodsmule__skille"> / </span>
      </span>
    );
  }
  return (
    <span>
      <span className="brodsmuler__smule">{tittel}</span>
      <span className="brodsmule__skille"> / </span>
    </span>
  );
};

export interface BrodsmulerProps {
  brodsmuler: BrodsmuleProps[];
}

const Brodsmuler = ({ brodsmuler }: BrodsmulerProps): ReactElement => {
  return (
    <nav className="brodsmuler" aria-label="Du er her: ">
      <img src={personImage} alt={texts.personImageAltText} className="brodsmuler__ikon" />
      <div className="brodsmuler__smuler">
        {brodsmuler.map((smule, index) => {
          return <Brodsmule key={index} {...smule} sisteSmule={brodsmuler.length === index + 1} />;
        })}
      </div>
    </nav>
  );
};

export default Brodsmuler;
