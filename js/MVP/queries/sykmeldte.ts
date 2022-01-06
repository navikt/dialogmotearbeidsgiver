import { get } from '@/api/axios';
import { Sykmeldt } from '@/api/types/sykmeldteTypes';
import { getSykmeldteUrl } from '@/MVP/globals/paths';
import { useQuery } from 'react-query';

const SYKMELDTE = 'sykmeldte';

export const useSykmeldte = (narmestelederId: string) => {
  const fetchSykmeldte = () => get<Sykmeldt>(getSykmeldteUrl(narmestelederId));
  return useQuery(SYKMELDTE, fetchSykmeldte);
};
