import { useQuery } from 'react-query';
import { get } from '../../gateway-api';

import { MOTEADMIN_API } from '../globals/paths';

const MOTEPLANLEGGER = 'moteplanlegger';

export const useMoteplanlegger = () => {
  return useQuery(
    MOTEPLANLEGGER,
    async () => {
      return get(MOTEADMIN_API);
    },
    {
      retry: 0,
    }
  );
};
