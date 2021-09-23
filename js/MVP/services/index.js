import { getRaw } from '../../gateway-api/gatewayApi';
import { ISDIALOGMOTE_API_BASE_PATH } from '../globals/paths';

export const getBrevPdf = async (uuid) => {
  const url = `${ISDIALOGMOTE_API_BASE_PATH}/${uuid}/pdf`;
  return getRaw(url);
};
