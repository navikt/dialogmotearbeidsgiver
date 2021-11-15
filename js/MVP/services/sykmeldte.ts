import { getSykmeldteUrl } from '@/MVP/globals/paths';
import { get } from '@/api/axios';
import { Sykmeldt } from '@/api/types/sykmeldteTypes';

export const getSykmeldt: (narmestelederId: string) => Promise<Sykmeldt> = async (narmestelederId: string) => {
  const url = getSykmeldteUrl(narmestelederId);
  return get(url);
};
