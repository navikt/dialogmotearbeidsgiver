import { useQuery } from 'react-query';
import { get } from '../../gateway-api';
import { MOTEBEHOV_API } from '../globals/paths';

const MOTEBEHOV = 'motebehov';

export const useMotebehov = (enabled, ansatt) => {
  const fnr = enabled ? ansatt.fnr : null;
  const virksomhetsnummer = enabled ? ansatt.orgnummer : null;

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
