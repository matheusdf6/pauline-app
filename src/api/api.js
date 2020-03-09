import axios from 'axios';

export const api = axios.create({
  /**
   * Api options
   */
  baseURL: 'https://paulinemaccari.com.br/wp-json/wp/v2/',

  /**
   * headers
   */
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Basic YWRtaW5pbmZvZGF0YTphMWdxIFlSbjMgZ0l0dyBnU0RUIFdyQ0wgOGlUOQ',
  },
});

/**
 * Format response
 */
api.interceptors.response.use(
  (response) => {
    if (response.data) {
      return response.data;
    }

    return response;
  },
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(error.response.data);
    }

    return Promise.reject(error);
  },
);

/**
 * Format request
 */
api.interceptors.request.use(
  async (request) => {
    const token = await localStorage.getItem('token');

    if (token) {
      request.headers.Authorization = `Basic ${token}`;
    }

    return request;
  },
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(error.response.data);
    }

    return Promise.reject(error);
  },
);

export default api;