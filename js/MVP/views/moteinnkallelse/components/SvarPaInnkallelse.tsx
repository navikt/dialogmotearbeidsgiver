import React from 'react';
import DittSvarPaInnkallelse from './DittSvarPaInnkallelse';
import { SvarType } from '@/api/types/brevTypes';
import GiSvarPaInnkallelse from './GiSvarPaInnkallelse';

interface Props {
  brevUuid: string;
  svarType?: SvarType;
}
const SvarPaInnkallelse = ({ brevUuid, svarType }: Props) => {
  return svarType ? <DittSvarPaInnkallelse svarType={svarType} /> : <GiSvarPaInnkallelse brevUuid={brevUuid} />;
};

export default SvarPaInnkallelse;
