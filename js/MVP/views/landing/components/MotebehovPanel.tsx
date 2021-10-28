import AlertStripe from 'nav-frontend-alertstriper';
import ModalWrapper from 'nav-frontend-modal';
import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';
import ButtonLenke from '../../../components/ButtonLenke';
import DialogmotePanel from '../../../containers/DialogmotePanel';
import { skjemaTypes } from '@/MVP/globals/constants';
import { getMotebehovUrl, getOppfolgingsplanerUrl, statiskeURLer } from '@/MVP/globals/paths';
import { BehovIcon } from '../../../icons';
import MotebehovKvittering from './Motebehov/MotebehovKvittering';
import { TrackedLenke } from '@/components/buttons/TrackedLenke';
import { TrackedKnapp } from '@/components/buttons/TrackedKnapp';
import { MotebehovStatus } from '@/api/types/motebehovTypes';

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
  titleSvarBehov: 'Trenger dere et dialogmøte med NAV?',
  button: 'Vurder behov for møte',
  text1: `Målet med et dialogmøtet er å oppsummere hva som har skjedd til nå, og snakke om hva som kan hjelpe arbeidstakeren å komme tilbake til arbeid.`,
  text2: `Ønsker du å snakke med NAV om sykepenger eller noe annet, kan du `,
  link: 'gå hit for å kontakte oss på andre måter.',
  titleSvartSvarBehov: 'Du har svart på om du ønsker et møte',
  titleSvart: 'Du har svart på om du ønsker et møte',
  buttonSvart: 'Se svaret ditt',
  textSvart: 'Vi vil bruke svaret ditt når vi vurderer om det er nødvendig med dialogmøte.',
  alertstripe: 'Husk å dele oppfølgingsplanen med NAV før møtet.',
  oppfolgingsplanlink: 'Gå til oppfølgingsplanen.',
};

const text = (): ReactElement => {
  return (
    <TekstomradeStyled>
      {texts.text1}
      <br />
      <br />
      {texts.text2}
      <TrackedLenke href={statiskeURLer.KONTAKT_INFO_URL} target="_blank">
        {texts.link}
      </TrackedLenke>
    </TekstomradeStyled>
  );
};

interface Props {
  motebehovStatus: MotebehovStatus;
  narmestelederId: string;
}

const MotebehovPanel = ({ motebehovStatus, narmestelederId }: Props): ReactElement => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { motebehov } = motebehovStatus;

  const modalStyle = { padding: '2rem 2.5rem', maxWidth: '576px' };

  if (motebehov) {
    if (motebehov.skjemaType === skjemaTypes.MELD_BEHOV) {
      return (
        <DialogmotePanelStyled title={texts.titleSvart} icon={<BehovIcon />}>
          <TekstomradeStyled>{texts.textSvart}</TekstomradeStyled>

          <ModalWrapper
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            closeButton
            contentLabel="Møtebehov modal"
            onAfterOpen={() => {
              const element = document.getElementsByClassName('lukknapp')[0];
              (element as HTMLElement)?.focus();
            }}
            appElement={document.getElementsByClassName('app')[0]}
          >
            <div style={modalStyle}>
              <MotebehovKvittering motebehov={motebehovStatus} />
            </div>
          </ModalWrapper>

          <AlertstripeStyled type="info">
            {texts.alertstripe}
            <br />
            <TrackedLenke href={getOppfolgingsplanerUrl(narmestelederId)}>{texts.oppfolgingsplanlink}</TrackedLenke>
          </AlertstripeStyled>

          <TrackedKnapp
            mini
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            {texts.buttonSvart}
          </TrackedKnapp>
        </DialogmotePanelStyled>
      );
    }

    return (
      <DialogmotePanelStyled title={texts.titleSvartSvarBehov} icon={<BehovIcon />}>
        <TekstomradeStyled>{texts.textSvart}</TekstomradeStyled>

        <ModalWrapper
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          closeButton
          contentLabel="Møtebehov modal"
          onAfterOpen={() => {
            const element = document.getElementsByClassName('lukknapp')[0];
            (element as HTMLElement)?.focus();
          }}
          appElement={document.getElementsByClassName('app')[0]}
        >
          <div style={modalStyle}>
            <MotebehovKvittering motebehov={motebehovStatus} />
          </div>
        </ModalWrapper>

        <AlertstripeStyled type="info">
          {texts.alertstripe}
          <br />
          <TrackedLenke href={getOppfolgingsplanerUrl(narmestelederId)}>{texts.oppfolgingsplanlink}</TrackedLenke>
        </AlertstripeStyled>

        <TrackedKnapp
          mini
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          {texts.buttonSvart}
        </TrackedKnapp>
      </DialogmotePanelStyled>
    );
  }

  if (motebehovStatus.skjemaType === skjemaTypes.MELD_BEHOV) {
    return (
      <DialogmotePanelStyled title={texts.title} icon={<BehovIcon />}>
        {text()}
        <ButtonLenke to={getMotebehovUrl(narmestelederId)}>{texts.button}</ButtonLenke>
      </DialogmotePanelStyled>
    );
  }

  return (
    <DialogmotePanelStyled title={texts.titleSvarBehov} icon={<BehovIcon />}>
      {text()}
      <ButtonLenke to={getMotebehovUrl(narmestelederId)}>{texts.button}</ButtonLenke>
    </DialogmotePanelStyled>
  );
};

export default MotebehovPanel;
