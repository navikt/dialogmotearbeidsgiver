import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getBrev, postLestBrev } from '../services/brev';

const BREV = 'BREV';

export const useBrev = (fnr?: string) => {
  return useQuery(BREV, () => getBrev(fnr), {
    enabled: !!fnr,
  });
};

const setLestDatoForBrev = (uuid: string) => {
  return (varsel) => {
    if (varsel.uuid === uuid) {
      return { ...varsel, lestDato: new Date().toString() };
    }

    return varsel;
  };
};

export const useMutateBrevLest = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ brevUuid }) => {
      return postLestBrev(brevUuid);
    },
    {
      onMutate: (variables: { brevUuid: string }) => {
        queryClient.setQueryData([BREV], (old: string[]) => {
          return old.map(setLestDatoForBrev(variables.brevUuid));
        });
      },
    }
  );
};
