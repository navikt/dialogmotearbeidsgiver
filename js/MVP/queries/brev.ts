import { get, post } from '@/api/axios';
import { Brev, SvarRespons } from '@/api/types/brevTypes';
import { ISDIALOGMOTE_PROXY_BASE_PATH } from '@/MVP/globals/paths';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const BREV = 'BREV';

export const useBrev = (fnr?: string) => {
  const fetchBrev = () => get<Brev[]>(ISDIALOGMOTE_PROXY_BASE_PATH, { personIdent: fnr });
  return useQuery(BREV, fetchBrev, {
    enabled: !!fnr,
  });
};

export const useSvarPaInnkallelse = (uuid: string) => {
  const queryClient = useQueryClient();
  const postSvar = (uuid, svar: SvarRespons) => post(`${ISDIALOGMOTE_PROXY_BASE_PATH}/${uuid}/respons`, svar);

  return useMutation((svar: SvarRespons) => postSvar(uuid, svar), {
    onSuccess: () => {
      queryClient.invalidateQueries(BREV);
    },
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

  const postLestBrev = (uuid) => post(`${ISDIALOGMOTE_PROXY_BASE_PATH}/${uuid}/les`);

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

export const getBrevPdf = (uuid: string): Promise<Blob> => {
  const url = `${ISDIALOGMOTE_PROXY_BASE_PATH}/${uuid}/pdf`;
  return get(url, { responseType: 'blob' });
};
