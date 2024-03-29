import ModalWrapper from 'nav-frontend-modal';
import Tekstomrade from 'nav-frontend-tekstomrade';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components';
import { motePt } from '@/propTypes';
import { BEKREFTET, MOTESTATUS } from '@/utils/moteplanleggerUtils';
import DialogmotePanel from '../../containers/DialogmotePanel';
import { KalenderInnkallingIcon } from '../../icons';
import BekreftelseKvittering from '../../views/moteplanlegger/components/BekreftelseKvittering';
import SvarKvittering from '../../views/moteplanlegger/components/SvarKvittering';
import { Knapp } from 'nav-frontend-knapper';

const texts = {
  titleSvart: 'Du har svart på tidspunkt for dialogmøte',
  textSvart: 'Når tidspunktet er avklart, vil du få en innkalling i posten med mer informasjon om møtet.',
  buttonSvart: 'Se svaret ditt',

  titleBekreftet: 'Tid og sted for dialogmøtet er klart',
};

const DialogmotePanelStyled = styled(DialogmotePanel)`
  margin-bottom: 32px;
`;

const TekstomradeStyled = styled(Tekstomrade)`
  margin: 32px 0;
`;

const MoteplanleggerKvitteringPanel = ({ mote, modus, sykmeldt }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  if (modus === BEKREFTET) {
    return (
      <DialogmotePanelStyled title={texts.titleBekreftet} icon={<KalenderInnkallingIcon />} sykmeldt={sykmeldt}>
        <BekreftelseKvittering mote={mote} />
      </DialogmotePanelStyled>
    );
  }

  if (modus === MOTESTATUS) {
    const modalStyle = { padding: '2rem 2.5rem', maxWidth: '576px' };
    return (
      <DialogmotePanelStyled title={texts.titleSvart} icon={<KalenderInnkallingIcon />} sykmeldt={sykmeldt}>
        <TekstomradeStyled>{texts.textSvart}</TekstomradeStyled>
        <ModalWrapper
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          closeButton
          contentLabel="Møteplanlegger kvittering"
        >
          <div style={modalStyle}>
            <SvarKvittering mote={mote} />
          </div>
        </ModalWrapper>

        <Knapp mini onClick={() => setIsModalOpen(true)}>
          {texts.buttonSvart}
        </Knapp>
      </DialogmotePanelStyled>
    );
  }
  return <div />;
};

MoteplanleggerKvitteringPanel.propTypes = { mote: motePt, modus: PropTypes.string, sykmeldt: PropTypes.object };

export default MoteplanleggerKvitteringPanel;
