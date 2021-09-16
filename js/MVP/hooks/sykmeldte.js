import { useQuery } from 'react-query';
import { get } from '../../gateway-api';
import { SYKMELDTE_URL } from '../globals/paths';

const SYKMELDTE = 'sykmeldte';
const BERIK_SYKMELDTE = 'berik_sykmeldte';

export const useSykmeldte = () => {
  return useQuery(
    SYKMELDTE,
    async () => {
      return get(SYKMELDTE_URL);
    },
    {
      retry: 0,
    }
  );
};

export const useBerikSykmeldte = (enabled, sykmeldte) => {
  const koblingIder = enabled ? [...new Set(sykmeldte.data.map((s) => s.koblingId))].join(',') : null;

  return useQuery(
    [BERIK_SYKMELDTE, koblingIder],
    async () => {
      const url = `${SYKMELDTE_URL}/berik?koblingsIder=${koblingIder}`;
      return get(url);
    },
    {
      retry: 0,
      enabled: !!enabled,
    }
  );
};
