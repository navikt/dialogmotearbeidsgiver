import { useQuery } from 'react-query';
import { get } from '@/api/axios';
import { getHentMotebehovUrl } from '../globals/paths';
import { MotebehovStatus } from '@/api/types/motebehovTypes';

const MOTEBEHOV = 'motebehov';

export const useMotebehov = (sykmeldt) => {
  const fnr = sykmeldt.isSuccess ? sykmeldt.data.fnr : null;
  const virksomhetsnummer = sykmeldt.isSuccess ? sykmeldt.data.orgnummer : null;
  const fetchMotebehov = () => get<MotebehovStatus>(getHentMotebehovUrl(fnr, virksomhetsnummer));

  return useQuery([MOTEBEHOV, fnr, virksomhetsnummer], fetchMotebehov, {
    enabled: sykmeldt.isSuccess,
  });
};
