import React from 'react';
import { Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Tilbakeknapp } from 'nav-frontend-ikonknapper';
import Brodsmuler from '../../components/Brodsmuler';
import { dialogmoteBreadcrumb, statiskeURLer } from '../globals/paths';

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

const DialogmoteContainer = ({
  title,
  sykmeldt,
  breadcrumb = dialogmoteBreadcrumb(sykmeldt),
  displayTilbakeknapp = false,
  children,
}) => {
  const history = useHistory();

  return (
    <WrapperStyled>
      <ContentStyled>
        <Brodsmuler brodsmuler={breadcrumb} />
        <HeaderStyled>
          <Sidetittel>{title}</Sidetittel>
        </HeaderStyled>
        {children}
        {displayTilbakeknapp && <TilbakeknappStyled onClick={history.goBack} />}
        <BottomInfoStyled>
          <Normaltekst>{texts.bottomText}</Normaltekst>
          <Lenke href={statiskeURLer.PERSONVERN_URL}>{texts.bottomUrl}</Lenke>
        </BottomInfoStyled>
      </ContentStyled>
    </WrapperStyled>
  );
};

DialogmoteContainer.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  displayTilbakeknapp: PropTypes.bool,
  sykmeldt: PropTypes.object,
  breadcrumb: PropTypes.array,
};

export default DialogmoteContainer;
