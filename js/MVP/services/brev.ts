import { ISDIALOGMOTE_PROXY_BASE_PATH } from '../globals/paths';
import { get, post } from '@/api/axios';

export const postLestBrev = async (uuid: string) => {
  const url = `${ISDIALOGMOTE_PROXY_BASE_PATH}/${uuid}/les`;
  return post(url);
};

export const getBrev = async (fnr: string) => {
  return get(ISDIALOGMOTE_PROXY_BASE_PATH, { personIdent: fnr });
};

export const getBrevPdf = async (uuid: string) => {
  const url = `${ISDIALOGMOTE_PROXY_BASE_PATH}/${uuid}/pdf`;
  return get(url, { responseType: 'blob' });
};