import axios, { AxiosError, ResponseType } from 'axios';
import { accessDeniedError, ApiErrorException, generalError, loginRequiredError, networkError } from './errors';
import { defaultRequestHeaders, hentLoginUrl } from '@/api/apiUtils';

interface AxiosOptions {
  personIdent?: string;
  responseType?: ResponseType;
}

function handleAxiosError(error: AxiosError) {
  if (error.response) {
    switch (error.response.status) {
      case 401: {
        window.location.href = `${hentLoginUrl()}?redirect=${window.location.origin}/sykefravaerarbeidsgiver`;
        throw new ApiErrorException(loginRequiredError(error), error.response.status);
      }
      case 403: {
        throw new ApiErrorException(accessDeniedError(error), error.response.status);
      }
      default:
        throw new ApiErrorException(generalError(error), error.response.status);
    }
  } else if (error.request) {
    throw new ApiErrorException(networkError(error));
  } else {
    throw new ApiErrorException(generalError(error));
  }
}

export const get = <ResponseData>(url: string, options?: AxiosOptions): Promise<ResponseData> => {
  return axios
    .get(url, {
      headers: defaultRequestHeaders(options?.personIdent),
      responseType: options?.responseType,
    })
    .then((response) => response.data)
    .catch(function (error) {
      if (axios.isAxiosError(error)) {
        handleAxiosError(error);
      } else {
        throw new ApiErrorException(generalError(error), error.code);
      }
    });
};

export const post = <ResponseData>(
  url: string,
  data?: Record<string, never>,
  options?: AxiosOptions
): Promise<ResponseData> => {
  return axios
    .post(url, data, {
      headers: defaultRequestHeaders(options?.personIdent),
    })
    .then((response) => response.data)
    .catch(function (error) {
      if (axios.isAxiosError(error)) {
        handleAxiosError(error);
      } else {
        throw new ApiErrorException(generalError(error.message), error.code);
      }
    });
};
