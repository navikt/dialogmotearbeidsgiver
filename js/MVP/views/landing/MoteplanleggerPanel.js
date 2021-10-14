import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { AVBRUTT } from '../../../utils/moteplanleggerUtils';
import ButtonLenke from '../../components/ButtonLenke';
import DialogmotePanel from '../../containers/DialogmotePanel';
import { LANDING_URL } from '../../globals/paths';
import { KalenderInnkallingAvlystIcon, KalenderInnkallingIcon } from '../../icons';

const SectionStyled = styled.section`
  margin: 32px 0;
`;

const texts = {
  title: 'Tidspunkt for dialogmøte',
  text: 'Her er vårt forslag til tidspunkt for dialogmøte.',
  button: 'Svar på om det passer',
  titleAvbrutt: 'En forespørsel om møte er avbrutt',
  textAvbrutt: 'Vi sendte deg tidligere en forespørsel om tid og sted til et dialogmøte, dette er avbrutt.',
  buttonAvbrutt: 'Se detaljer',
};

const Panel = ({ title, text, icon, buttonText, narmestelederId }) => {
  return (
    <DialogmotePanel title={title} icon={icon}>
      <SectionStyled>{text}</SectionStyled>
      <ButtonLenke mini to={`${LANDING_URL}/${narmestelederId}/mote`}>
        {buttonText}
      </ButtonLenke>
    </DialogmotePanel>
  );
};

Panel.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  icon: PropTypes.element,
  buttonText: PropTypes.string,
  narmestelederId: PropTypes.string,
};

const MoteplanleggerPanel = ({ narmestelederId, modus }) => {
  if (modus === AVBRUTT) {
    return (
      <Panel
        title={texts.titleAvbrutt}
        text={texts.textAvbrutt}
        icon={<KalenderInnkallingAvlystIcon />}
        buttonText={texts.buttonAvbrutt}
        narmestelederId={narmestelederId}
      />
    );
  }

  return (
    <Panel
      title={texts.title}
      text={texts.text}
      icon={<KalenderInnkallingIcon />}
      buttonText={texts.button}
      narmestelederId={narmestelederId}
    />
  );
};

MoteplanleggerPanel.propTypes = { narmestelederId: PropTypes.string, modus: PropTypes.string };

export default MoteplanleggerPanel;
