import axios, { AxiosError } from 'axios';
import { GIPHY_API_KEY, GIPHY_BASE_URL } from '../utils/constants';

const apiClient = axios.create({
  baseURL: GIPHY_BASE_URL,
  timeout: 15000,
});

apiClient.interceptors.request.use(config => {
  config.params = {
    ...config.params,
    api_key: GIPHY_API_KEY,
  };
  return config;
});

apiClient.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    let message = 'Something went wrong. Please try again.';

    if (error.code === 'ECONNABORTED') {
      message = 'Request timed out. Check your connection.';
    } else if (!error.response) {
      message = 'No internet connection.';
    } else {
      switch (error.response.status) {
        case 400:
          message = 'Bad request. Please try again.';
          break;
        case 401:
          message = 'Unauthorized. Invalid API key.';
          break;
        case 403:
          message = 'API key rate limit reached. Try again in a moment.';
          break;
        case 404:
          message = 'Content not found.';
          break;
        case 429:
          message = 'Too many requests. Please slow down.';
          break;
        case 500:
        case 502:
        case 503:
          message = 'Giphy server error. Try again later.';
          break;
        default:
          message = `Error ${error.response.status}. Please try again.`;
      }
    }

    return Promise.reject(new Error(message));
  },
);

export default apiClient;
