import { getRaw } from '../../gateway-api/gatewayApi';
import { ISDIALOGMOTE_PROXY_BASE_PATH } from '../globals/paths';

export const getBrevPdf = async (uuid) => {
  const url = `${ISDIALOGMOTE_PROXY_BASE_PATH}/${uuid}/pdf`;
  return getRaw(url);
};
