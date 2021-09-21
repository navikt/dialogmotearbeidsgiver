import { useQuery } from 'react-query';
import { get } from '../../gateway-api';
import { MOTEBEHOV_API } from '../globals/paths';

const MOTEBEHOV = 'motebehov';

export const useMotebehov = (sykmeldt) => {
  const enabled = sykmeldt !== null;

  const fnr = enabled ? sykmeldt.fnr : null;
  const virksomhetsnummer = enabled ? sykmeldt.orgnummer : null;

  return useQuery(
    [MOTEBEHOV, fnr, virksomhetsnummer],
    async () => {
      const url = `${MOTEBEHOV_API}?fnr=${fnr}&virksomhetsnummer=${virksomhetsnummer}`;
      return get(url);
    },
    {
      retry: 0,
      enabled: !!enabled,
    }
  );
};
