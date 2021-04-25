import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { getContextRoot } from '../routers/paths';
import { brodsmule as brodsmulePt } from '../propTypes';
import { getSykefravaerarbeidsgiverUrl } from '../utils/urlUtils';

const Brodsmule = ({ sti, tittel, sisteSmule, erKlikkbar }) => {
  const nySti = sti && sti.indexOf('/sykefravaerarbeidsgiver') > -1 ? getSykefravaerarbeidsgiverUrl(sti) : sti;
  const root = sti && sti.indexOf('/sykefravaerarbeidsgiver') > -1 ? '' : getContextRoot();
  const link =
    root === '' ? (
      <a className="js-smule js-smule-a brodsmuler__smule" href={nySti}>
        {tittel}
      </a>
    ) : (
      <Link className="js-smule brodsmuler__smule" to={root + sti}>
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

Brodsmule.propTypes = {
  sti: PropTypes.string,
  tittel: PropTypes.string,
  sisteSmule: PropTypes.bool,
  erKlikkbar: PropTypes.bool,
};

const ToggleLink = ({ onClick }) => {
  return (
    <span>
      <a
        role="button"
        aria-label="Vis hele brødsmulestien"
        className="js-toggle brodsmuler__smule"
        href="#"
        onClick={onClick}
      >
        ...
      </a>
      <span className="brodsmule__skille"> / </span>
    </span>
  );
};

ToggleLink.propTypes = {
  onClick: PropTypes.func,
};

const Brodsmuler = ({ brodsmuler }) => {
  return (
    <nav className="brodsmuler" aria-label="Du er her: ">
      <img src="/dialogmotearbeidsgiver/img/svg/person.svg" alt="Du" className="brodsmuler__ikon" />
      <div className="brodsmuler__smuler">
        {brodsmuler.map((smule, index) => {
          return (
            <Brodsmule
              key={index}
              {...smule}
              enesteSmule={brodsmuler.length === 1}
              sisteSmule={brodsmuler.length === index + 1}
            />
          );
        })}
      </div>
    </nav>
  );
};

Brodsmuler.propTypes = {
  brodsmuler: PropTypes.arrayOf(brodsmulePt),
};

export default Brodsmuler;
