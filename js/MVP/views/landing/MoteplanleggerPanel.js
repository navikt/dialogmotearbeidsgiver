import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { AVBRUTT } from '../../../utils/moteplanleggerUtils';
import ButtonLenke from '../../components/ButtonLenke';
import DialogmotePanel from '../../containers/DialogmotePanel';
import { LANDING_URL } from '../../globals/paths';
import kalenderInnkallingImage from '../../../../img/svg/kalender-innkalling.svg';
import kalenderInnkallingAvlystImage from '../../../../img/svg/kalender-innkalling_avlyst.svg';

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

const Panel = ({ title, text, icon, buttonText, koblingId }) => {
  return (
    <DialogmotePanel title={title} icon={icon}>
      <SectionStyled>{text}</SectionStyled>
      <ButtonLenke mini to={`${LANDING_URL}/${koblingId}/mote`}>
        {buttonText}
      </ButtonLenke>
    </DialogmotePanel>
  );
};

Panel.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  icon: PropTypes.string,
  buttonText: PropTypes.string,
  koblingId: PropTypes.string,
};

const MoteplanleggerPanel = ({ koblingId, modus }) => {
  if (modus === AVBRUTT) {
    return (
      <Panel
        title={texts.titleAvbrutt}
        text={texts.textAvbrutt}
        icon={kalenderInnkallingAvlystImage}
        buttonText={texts.buttonAvbrutt}
        koblingId={koblingId}
      />
    );
  }

  return (
    <Panel
      title={texts.title}
      text={texts.text}
      icon={kalenderInnkallingImage}
      buttonText={texts.button}
      koblingId={koblingId}
    />
  );
};

MoteplanleggerPanel.propTypes = { koblingId: PropTypes.string, modus: PropTypes.string };

export default MoteplanleggerPanel;
