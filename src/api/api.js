import axios from 'axios';

import Storage from "../services/Storage";

export const api = axios.create({
    /**
     * Api options
     */
    baseURL: 'https://paulinemaccari.com.br/wp-json/wp/v2/',
    // baseURL: 'http://localhost:80/wp-json/wp/v2/',
    /**
     * headers
     */
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
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
    async(request) => {
        const token = await Storage.getLocalStorage("token")

        if (token) {
            request.headers.Authorization = `Bearer ${token}`;
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