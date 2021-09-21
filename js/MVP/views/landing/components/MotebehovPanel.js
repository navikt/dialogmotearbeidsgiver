import AlertStripe from 'nav-frontend-alertstriper';
import { Knapp } from 'nav-frontend-knapper';
import Lenke from 'nav-frontend-lenker';
import ModalWrapper from 'nav-frontend-modal';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components';
import ButtonLenke from '../../../components/ButtonLenke';
import DialogmotePanel from '../../../containers/DialogmotePanel';
import { skjemaTypes } from '../../../globals/constants';
import { getMotebehovUrl, getOppfolgingsplanerUrl, LANDING_URL } from '../../../globals/paths';
import MotebehovKvittering from './Motebehov/MotebehovKvittering';

const DialogmotePanelStyled = styled(DialogmotePanel)`
  margin-bottom: 32px;
`;

const TekstomradeStyled = styled.p`
  margin: 32px 0;
`;

const AlertstripeStyled = styled(AlertStripe)`
  margin: 32px 0;
`;

const texts = {
  title: 'Trenger dere et dialogmøte med NAV?',
  titleSvarBehov: 'Trenger dere et dialogmøte med NAV? SVAR BEHOV',
  button: 'Vurder behov for møte',
  text1: `Målet med et dialogmøtet er å oppsummere hva som har skjedd til nå, og snakke om hva som kan hjelpe deg å komme tilbake til arbeid.`,
  text2: `Ønsker du å snakke med NAV om sykepenger eller noe annet, kan du `,
  link: 'gå hit for å kontakte oss på andre måter.',
  titleSvartSvarBehov: 'Du har gitt svar om ditt møtebehov SVAR BEHOV',
  titleSvart: 'Du har svart på om du ønsker et møte',
  buttonSvart: 'Se svaret ditt',
  textSvart: 'Vi vil bruke svaret ditt når vi vurderer om det er nødvendig med dialogmøte.',
  alertstripe: 'Husk å dele oppfølgingsplanen med NAV før møtet.',
  oppfolgingsplanlink: 'Gå til oppfølgingsplanen.',
};

const text = () => {
  return (
    <TekstomradeStyled>
      {texts.text1}
      <br />
      <br />
      {texts.text2}
      <Lenke href="https://www.nav.no/person/kontakt-oss/nb/skriv-til-oss" target="_blank">
        {texts.link}
      </Lenke>
    </TekstomradeStyled>
  );
};

const MotebehovPanel = ({ motebehov, koblingId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data } = motebehov;

  const modalStyle = { padding: '2rem 2.5rem', maxWidth: '576px' };

  if (data.motebehov) {
    if (data.skjemaType === skjemaTypes.MELD_BEHOV) {
      return (
        <DialogmotePanelStyled title={texts.titleSvart} icon="behov">
          <TekstomradeStyled>{texts.textSvart}</TekstomradeStyled>

          <ModalWrapper
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            closeButton
            contentLabel="Møtebehov modal"
            onAfterOpen={() => {
              document.getElementsByClassName('lukknapp')[0].focus();
            }}
            appElement={document.getElementsByClassName('app')[0]}
          >
            <div style={modalStyle}>
              <MotebehovKvittering motebehov={data} />
            </div>
          </ModalWrapper>

          <AlertstripeStyled type="info">
            {texts.alertstripe}
            <br />
            <Lenke href={`${LANDING_URL}/${koblingId}/oppfolgingsplaner`}>{texts.oppfolgingsplanlink}</Lenke>
          </AlertstripeStyled>

          <Knapp mini onClick={() => setIsModalOpen(true)}>
            {texts.buttonSvart}
          </Knapp>
        </DialogmotePanelStyled>
      );
    }

    return (
      <DialogmotePanelStyled title={texts.titleSvartSvarBehov} icon="behov">
        <TekstomradeStyled>{texts.textSvart}</TekstomradeStyled>

        <ModalWrapper
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          closeButton
          contentLabel="Møtebehov modal"
          onAfterOpen={() => {
            document.getElementsByClassName('lukknapp')[0].focus();
          }}
          appElement={document.getElementsByClassName('app')[0]}
        >
          <div style={modalStyle}>
            <MotebehovKvittering motebehov={data} />
          </div>
        </ModalWrapper>

        <AlertstripeStyled type="info">
          {texts.alertstripe}
          <br />
          <Lenke href={getOppfolgingsplanerUrl(koblingId)}>{texts.oppfolgingsplanlink}</Lenke>
        </AlertstripeStyled>

        <Knapp mini onClick={() => setIsModalOpen(true)}>
          {texts.buttonSvart}
        </Knapp>
      </DialogmotePanelStyled>
    );
  }

  if (data.skjemaType === skjemaTypes.MELD_BEHOV) {
    return (
      <DialogmotePanelStyled title={texts.title} icon="behov">
        {text()}
        <ButtonLenke mini to={getMotebehovUrl(koblingId)}>
          {texts.button}
        </ButtonLenke>
      </DialogmotePanelStyled>
    );
  }

  return (
    <DialogmotePanelStyled title={texts.titleSvarBehov} icon="behov">
      {text()}
      <ButtonLenke mini to={getMotebehovUrl(koblingId)}>
        {texts.button}
      </ButtonLenke>
    </DialogmotePanelStyled>
  );
};

MotebehovPanel.propTypes = {
  motebehov: PropTypes.object,
  koblingId: PropTypes.string,
};

export default MotebehovPanel;
