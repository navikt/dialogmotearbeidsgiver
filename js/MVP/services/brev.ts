import { ISDIALOGMOTE_PROXY_BASE_PATH } from '../globals/paths';
import { get, post } from '@/api/axios';
import { Brev } from '@/api/types/brevTypes';

export const postLestBrev = (uuid: string): Promise<void> => {
  const url = `${ISDIALOGMOTE_PROXY_BASE_PATH}/${uuid}/les`;
  return post(url);
};

export const getBrev = (fnr?: string): Promise<Brev[]> => {
  return get(ISDIALOGMOTE_PROXY_BASE_PATH, { personIdent: fnr });
};

export const getBrevPdf = (uuid: string): Promise<Blob> => {
  const url = `${ISDIALOGMOTE_PROXY_BASE_PATH}/${uuid}/pdf`;
  return get(url, { responseType: 'blob' });
};
