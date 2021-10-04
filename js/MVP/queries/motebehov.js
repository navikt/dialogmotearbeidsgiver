import { useQuery } from 'react-query';
import { get } from '../../gateway-api';
import { getHentMotebehovUrl } from '../globals/paths';

const MOTEBEHOV = 'motebehov';

export const useMotebehov = (sykmeldt) => {
  console.log("QWQWQW", sykmeldt)
  const enabled = sykmeldt && !sykmeldt.isError && !sykmeldt.isLoading;
  console.log("enabled", enabled)

  const fnr = enabled ? sykmeldt.fnr : null;
  const virksomhetsnummer = enabled ? sykmeldt.orgnummer : null;

  return useQuery(
    [MOTEBEHOV, fnr, virksomhetsnummer],
    async () => {
      return get(getHentMotebehovUrl(fnr, virksomhetsnummer));
    },
    {
      retry: 0,
      enabled: !!enabled,
    }
  );
};
