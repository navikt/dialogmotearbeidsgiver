import React from 'react';
import PropTypes from 'prop-types';
import { Element, Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import { DocumentTypes } from '../globals/constants';
import Lenke from 'nav-frontend-lenker';
import { trackOnClick } from '@/amplitude/amplitude';
import { eventNames } from '@/amplitude/events';

const DocumentRenderer = ({ documentComponent }) => {
  const { type, title, texts } = documentComponent;

  switch (type) {
    case DocumentTypes.HEADER:
      return (
        <React.Fragment>
          {texts.map((text, index) => (
            <Innholdstittel key={index}>{text}</Innholdstittel>
          ))}
        </React.Fragment>
      );

    case DocumentTypes.LINK:
      return (
        <React.Fragment>
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
        </React.Fragment>
      );

    case DocumentTypes.PARAGRAPH:
      return (
        <React.Fragment>
          {title && <Element>{title}</Element>}
          {texts.map((text, index) => (
            <Normaltekst key={index}>{text}</Normaltekst>
          ))}
        </React.Fragment>
      );

    default:
      return null;
  }
};

DocumentRenderer.propTypes = {
  documentComponent: PropTypes.shape({
    type: PropTypes.oneOf(Object.values(DocumentTypes)),
    title: PropTypes.string,
    texts: PropTypes.arrayOf(PropTypes.string),
  }),
};

export default DocumentRenderer;
