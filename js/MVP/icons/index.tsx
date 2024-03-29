import React from 'react';
import Icon from './Icon';

import dokumentImage from '../../../img/svg/dokument.svg';
import kalenderInnkallingImage from '../../../img/svg/kalender-innkalling.svg';
import kalenderInnkallingAvlystImage from '../../../img/svg/kalender-innkalling_avlyst.svg';
import behovImage from '../../../img/svg/behov.svg';
import ikkeSykmeldtImage from '../../../img/svg/dialog-report-gra.svg';

export const DokumentIcon = (props) => <Icon icon={dokumentImage} {...props} />;
export const KalenderInnkallingIcon = (props) => <Icon icon={kalenderInnkallingImage} {...props} />;
export const KalenderInnkallingAvlystIcon = (props) => <Icon icon={kalenderInnkallingAvlystImage} {...props} />;
export const BehovIcon = (props) => <Icon icon={behovImage} {...props} />;
export const IkkeSykmeldtIcon = (props) => <Icon icon={ikkeSykmeldtImage} {...props} />;
