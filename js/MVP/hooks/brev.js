import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getBrev, postLestBrev } from '../services/brev';
import { useSykmeldt } from './sykmeldt';

const BREV = 'brev';

export const useBrev = (koblingId) => {
  const { fnr } = useSykmeldt(koblingId);
  return useQuery([BREV, fnr], () => getBrev(fnr), {
    enabled: !!fnr,
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
      queryClient.setQueryData(BREV, (old) => {
        return old.map(setLestDatoForBrev(variables.uuid));
      });
    },
  });
};
