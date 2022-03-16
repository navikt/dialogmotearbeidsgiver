import React, { ReactElement, ReactNode } from 'react';
import { Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Brodsmuler, { BrodsmuleProps } from '../../components/Brodsmuler';
import { statiskeURLer } from '../globals/paths';
import Lenke from 'nav-frontend-lenker';
import { eventNames } from '@/amplitude/events';
import { Tilbakeknapp } from 'nav-frontend-ikonknapper';
import { trackOnClick } from '@/amplitude/amplitude';

const WrapperStyled = styled.div`
  display: flex;
  justify-content: center;
  background-color: #f1f1f1;
  padding: 32px;
`;

const ContentStyled = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: stretch;
  max-width: 640px;
`;

const HeaderStyled = styled.header`
  margin: 32px 0;
  text-align: center;
`;

const TilbakeknappStyled = styled(Tilbakeknapp)`
  width: 108px;
  margin-bottom: 32px;
`;

const BottomInfoStyled = styled.section`
  text-align: center;
  margin-top: auto;
`;

const texts = {
  bottomText: 'Vi bruker opplysningene også til å gjøre selve tjenesten bedre.',
  bottomUrl: 'Les mer om hvordan NAV behandler personopplysninger.',
};

interface Props {
  title?: string;
  children: ReactNode;
  displayTilbakeknapp?: boolean;
  breadcrumb: BrodsmuleProps[];
}

const DialogmoteContainer = ({ title, breadcrumb, displayTilbakeknapp = false, children }: Props): ReactElement => {
  const history = useHistory();

  return (
    <WrapperStyled>
      <ContentStyled>
        <Brodsmuler brodsmuler={breadcrumb} />
        {title && (
          <HeaderStyled>
            <Sidetittel>{title}</Sidetittel>
          </HeaderStyled>
        )}
        {children}
        {displayTilbakeknapp && <TilbakeknappStyled onClick={history.goBack} />}
        <BottomInfoStyled>
          <Normaltekst>{texts.bottomText}</Normaltekst>
          <Lenke
            href={statiskeURLer.PERSONVERN_URL}
            onClick={() => trackOnClick(eventNames.behandlePersonopplysninger)}
          >
            {texts.bottomUrl}
          </Lenke>
        </BottomInfoStyled>
      </ContentStyled>
    </WrapperStyled>
  );
};

export default DialogmoteContainer;
