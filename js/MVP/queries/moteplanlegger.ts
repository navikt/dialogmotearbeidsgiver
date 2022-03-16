import { Moteplanlegger } from '@/api/types/moteplanleggerTypes';
import { useQuery } from 'react-query';
import { get } from '@/api/axios';

import { MOTEADMIN_API } from '../globals/paths';

const MOTEPLANLEGGER = 'moteplanlegger';

export const useMoteplanlegger = () => {
  return useQuery(MOTEPLANLEGGER, async () => {
    return get<Moteplanlegger>(`${MOTEADMIN_API}/arbeidsgiver/moter`);
  });
};
