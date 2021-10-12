import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getBrev, postLestBrev } from '../services/brev';
import { useSykmeldte } from './sykmeldte';

const brevQueryKeys = (narmestelederId) => ['brev', narmestelederId];

export const useBrev = (narmestelederId) => {
  const sykmeldteQuery = useSykmeldte(narmestelederId);
  const fnr = sykmeldteQuery.isSuccess ? sykmeldteQuery.data.fnr : null;
  return useQuery(brevQueryKeys(narmestelederId), () => getBrev(fnr), {
    enabled: sykmeldteQuery.isSuccess,
  });
};

const setLestDatoForBrev = (uuid) => {
  return (varsel) => {
    if (varsel.uuid === uuid) {
      return { ...varsel, lestDato: new Date().toString() };
    }

    return varsel;
  };
};

export const useMutateBrevLest = () => {
  const queryClient = useQueryClient();

  return useMutation(({ brevUuid }) => postLestBrev(brevUuid), {
    onMutate: (variables) => {
      queryClient.setQueryData(brevQueryKeys(variables.narmestelederId), (old) => {
        return old.map(setLestDatoForBrev(variables.brevUuid));
      });
    },
    onSettled: (variables) => {
      queryClient.invalidateQueries(brevQueryKeys(variables.narmestelederId));
    },
  });
};
