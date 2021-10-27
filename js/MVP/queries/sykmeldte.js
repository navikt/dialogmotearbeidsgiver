import { useQuery } from 'react-query';
import { get } from '../../gateway-api';
import { getSykmeldteUrl } from '../globals/paths';

const SYKMELDTE = 'sykmeldte';

export const useSykmeldte = (narmestelederId) => {
  return useQuery(SYKMELDTE, async () => {
    const url = getSykmeldteUrl(narmestelederId);
    return get(url);
  });
};
