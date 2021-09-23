import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getBrev, postLestBrev } from '../services/brev';

const MOTEINNKALLELSE = 'moteinnkallelse';

export const useBrev = () => {
  return useQuery(MOTEINNKALLELSE, getBrev, {
    retry: 0,
  });
};

const setLestDatoForBrev = (uuid) => {
  return (varsel) => {
    if (varsel.uuid === uuid) {
      return { ...varsel, lestDato: true };
    }

    return varsel;
  };
};

export const useMutateBrevLest = () => {
  const queryClient = useQueryClient();

  return useMutation(({ uuid }) => postLestBrev(uuid), {
    onSuccess: (_data, variables) => {
      queryClient.setQueryData([MOTEINNKALLELSE], (old) => {
        return old.map(setLestDatoForBrev(variables.uuid));
      });
    },
  });
};
