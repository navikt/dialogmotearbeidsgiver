import { useQuery } from 'react-query';
import { getSykmeldt } from '@/MVP/services/sykmeldte';

const SYKMELDTE = 'sykmeldte';

export const useSykmeldte = (narmestelederId: string) => {
  return useQuery(SYKMELDTE, () => getSykmeldt(narmestelederId));
};
