import React from 'react';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { UndertekstBold } from 'nav-frontend-typografi';
import styled from 'styled-components';
import { infoUrls } from '../data/infoUrls';
import { eventNames } from '@/amplitude/events';
import Lenke from 'nav-frontend-lenker';
import { trackOnClick } from '@/amplitude/amplitude';

const AlertStripeStyled = styled(AlertStripeInfo)`
  margin-top: 32px;
`;

const SectionStyled = styled.section`
  padding-left: 8px;
`;

const texts = {
  title: 'Du kan finne mer informasjon på nav.no:',
};

const ListUrls = ({ documentKeys }: { documentKeys: string[] }) => {
  const infoKeys = Object.keys(infoUrls);
  const documentKeysSet = [...new Set(documentKeys)];
  const validDocumentKeys = documentKeysSet.filter((key) => infoKeys.includes(key));

  if (validDocumentKeys.length === 0) {
    return null;
  }

  return (
    <SectionStyled>
      {validDocumentKeys.map((key) => {
        const { text, url } = infoUrls[key];

        return (
          <li key={key}>
            <Lenke href={url} onClick={() => trackOnClick(eventNames.lenkeIReferatInfoBoks, { linkType: text })}>
              {text}
            </Lenke>
          </li>
        );
      })}
    </SectionStyled>
  );
};

interface Props {
  documentKeys: string[];
}

const LinkInfoBox = ({ documentKeys = [] }: Props) => {
  const infoKeys = Object.keys(infoUrls);
  const documentKeysFiltered = documentKeys.filter((key) => !!key);

  if (documentKeysFiltered.length === 0) {
    return null;
  }

  if (!documentKeysFiltered.some((key) => infoKeys.includes(key))) {
    return null;
  }

  return (
    <AlertStripeStyled>
      <UndertekstBold>{texts.title}</UndertekstBold>
      <ListUrls documentKeys={documentKeysFiltered} />
    </AlertStripeStyled>
  );
};

export default LinkInfoBox;
