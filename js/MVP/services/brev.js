import { get, post, getRaw } from '../../gateway-api/gatewayApi';
import { ISDIALOGMOTE_PROXY_BASE_PATH } from '../globals/paths';

export const postLestBrev = async (uuid) => {
  const url = `${ISDIALOGMOTE_PROXY_BASE_PATH}/${uuid}/les`;
  return post(url);
};

export const getBrev = async (fnr) => {
  const url = ISDIALOGMOTE_PROXY_BASE_PATH;
  const header = { 'nav-personident': fnr };
  return get(url, header);
};

export const getBrevPdf = async (uuid) => {
  const url = `${ISDIALOGMOTE_PROXY_BASE_PATH}/${uuid}/pdf`;
  return getRaw(url);
};
