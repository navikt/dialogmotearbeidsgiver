import { useQuery } from 'react-query';
import { get } from '../../gateway-api';
import { getHentMotebehovUrl } from '../globals/paths';

const MOTEBEHOV = 'motebehov';

export const useMotebehov = (sykmeldt) => {
  const fnr = sykmeldt.isSuccess ? sykmeldt.data.fnr : null;
  const virksomhetsnummer = sykmeldt.isSuccess ? sykmeldt.data.orgnummer : null;

  return useQuery(
    [MOTEBEHOV, fnr, virksomhetsnummer],
    async () => {
      return get(getHentMotebehovUrl(fnr, virksomhetsnummer));
    },
    {
      enabled: sykmeldt.isSuccess,
    }
  );
};
