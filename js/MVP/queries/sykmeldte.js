import { useQuery } from 'react-query';
import { get } from '@/api/axios';
import { getSykmeldteUrl } from '../globals/paths';

const SYKMELDTE = 'sykmeldte';

export const useSykmeldte = (narmestelederId) => {
  return useQuery(SYKMELDTE, async () => {
    var dato = new Date().toISOString();
    const url = getSykmeldteUrl(narmestelederId, dato);
    return get(url);
  });
};
