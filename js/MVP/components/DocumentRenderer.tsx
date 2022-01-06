import React from 'react';
import { Element, Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import { DocumentTypes } from '../globals/constants';
import Lenke from 'nav-frontend-lenker';
import { trackOnClick } from '@/amplitude/amplitude';
import { eventNames } from '@/amplitude/events';
import { DocumentComponent } from '@/api/types/brevTypes';

interface Props {
  documentComponent: DocumentComponent;
}

const DocumentRenderer = ({ documentComponent }: Props) => {
  const { type, title, texts } = documentComponent;

  switch (type) {
    case DocumentTypes.HEADER:
      return (
        <>
          {texts.map((text, index) => (
            <Innholdstittel key={index}>{text}</Innholdstittel>
          ))}
        </>
      );

    case DocumentTypes.LINK:
      return (
        <>
          {title && <Element>{title}</Element>}
          {texts.map((text, index) => (
            <Lenke
              key={index}
              href={text}
              onClick={() => trackOnClick(eventNames.documentRendererLink, { linkType: text })}
            >
              {text}
            </Lenke>
          ))}
        </>
      );

    case DocumentTypes.PARAGRAPH:
      return (
        <>
          {title && <Element>{title}</Element>}
          {texts.map((text, index) => (
            <Normaltekst key={index}>{text}</Normaltekst>
          ))}
        </>
      );

    default:
      return null;
  }
};

export default DocumentRenderer;
