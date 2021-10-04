import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getBrev, postLestBrev } from '../services/brev';
import { useSykmeldt } from './sykmeldt';

const brevQueryKeys = (koblingId) => ['brev', koblingId];

export const useBrev = (koblingId) => {
  const { fnr } = useSykmeldt(koblingId);
  return useQuery(brevQueryKeys(koblingId), () => getBrev(fnr), {
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

  return useMutation(({ brevUuid }) => postLestBrev(brevUuid), {
    onMutate: (variables) => {
      queryClient.setQueryData(brevQueryKeys(variables.koblingId), (old) => {
        return old.map(setLestDatoForBrev(variables.brevUuid));
      });
    },
    onSettled: (variables) => {
      queryClient.invalidateQueries(brevQueryKeys(variables.koblingId));
    },
  });
};
