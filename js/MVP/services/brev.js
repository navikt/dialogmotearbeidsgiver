import { ISDIALOGMOTE_PROXY_BASE_PATH } from '../globals/paths';
import { get, getBlob, post } from '@/api/axios';

export const postLestBrev = async (uuid) => {
  const url = `${ISDIALOGMOTE_PROXY_BASE_PATH}/${uuid}/les`;
  return post(url, {});
};

export const getBrev = async (fnr) => {
  return get(ISDIALOGMOTE_PROXY_BASE_PATH, fnr);
};

export const getBrevPdf = async (uuid) => {
  const url = `${ISDIALOGMOTE_PROXY_BASE_PATH}/${uuid}/pdf`;
  return getBlob(url);
};
