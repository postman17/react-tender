import axios from 'axios';
import { logoutFn } from 'src/models/Auth';
import { config } from 'src/config';
import { LSKeys, safeLocalStorage } from 'src/helpers/localStorage';

const axiosConfig = {
  baseURL: config.API_URL,
};

const instance = axios.create(axiosConfig);
let refreshPromise;

class RefreshTokenError extends Error {
  constructor(message) {
    super(message);
    this.name = 'Unauthorized';
  }
}

initiateTokensInterceptors(instance);

const sendRefreshTokenRequest = async (refreshToken) => instance.post('/auth/refresh/', { refresh: refreshToken });

const refreshTokens = async () => {
  const refreshToken = safeLocalStorage.getItem(LSKeys.REFRESH_TOKEN);

  if (!refreshToken) {
    throw new RefreshTokenError('Пользователь не авторизован');
  }

  try {
    // save promise to keep 1 active JWT refresh request at any time.
    refreshPromise = refreshPromise || sendRefreshTokenRequest(refreshToken);

    const refreshedTokens = await refreshPromise;

    safeLocalStorage.setItem(LSKeys.REFRESH_TOKEN, refreshedTokens?.refresh);
    safeLocalStorage.setItem(LSKeys.ACCESS_TOKEN, refreshedTokens?.access);
  } finally {
    refreshPromise = undefined;
  }
};

const handleRetryRequestErrors = (errorFromSecondRequest) => {
  const isRetryRequestUnauthorized = errorFromSecondRequest.response?.status === 401;
  const isRefreshTokenRequestFailed = errorFromSecondRequest instanceof RefreshTokenError;
  const isFailedToRefreshTokens = isRefreshTokenRequestFailed || isRetryRequestUnauthorized;

  if (isFailedToRefreshTokens) {
    logoutFn();
  }

  throw errorFromSecondRequest;
};

const retryRequest = async (originalReq) => {
  const retryRequestObject = { ...originalReq };

  retryRequestObject.isRetryAttempt = true;
  retryRequestObject.headers.Authorization = instance.defaults.headers.common.Authorization;

  const retryRequestResponse = await instance.request(retryRequestObject);

  return retryRequestResponse;
};

const handleResponseError = async (error) => {
  const { config: originalReq, response } = error;
  const isRefreshRequest = originalReq.url === '/auth/refresh/';
  const isLoginRequest = originalReq.url === '/auth/obtain/';
  const isSecondAttempt = originalReq.isRetryAttempt;
  const isOriginalRequestUnauthorized = response?.status === 401;

  if (isRefreshRequest || isLoginRequest || isSecondAttempt || !isOriginalRequestUnauthorized) {
    throw error;
  }

  try {
    await refreshTokens();
    const retryRequestResponse = retryRequest(originalReq);

    return retryRequestResponse;
  } catch (repeatedError) {
    return handleRetryRequestErrors(repeatedError);
  }
};

const addAuthHeaderToRequest = async (requestConfig) => {
  const accessToken = await safeLocalStorage.getItem(LSKeys.ACCESS_TOKEN);
  const updatedConfig = requestConfig;

  if (accessToken) {
    updatedConfig.headers.Authorization = `Bearer ${accessToken}`;
  }

  return updatedConfig;
};

function initiateTokensInterceptors(axiosInstance) {
  axiosInstance.interceptors.request.use(
    (requestConfig) => addAuthHeaderToRequest(requestConfig),
    (error) => Promise.reject(error),
  );

  axiosInstance.interceptors.response.use(
    (response) => response.data,
    (error) => handleResponseError(error),
  );
}

export { instance as axios };
