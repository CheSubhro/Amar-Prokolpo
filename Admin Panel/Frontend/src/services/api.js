
import axios from 'axios';
import { store } from '../store/store'; 

const refreshApi = axios.create({
    baseURL: 'http://localhost:8000/api/v1',
    withCredentials: true,
});

const api = axios.create({
    baseURL: 'http://localhost:8000/api/v1',
    withCredentials: true, 
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {

        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.url.includes('/users/refresh-token')) {
            originalRequest._retry = true;

            try {
                await store.dispatch(refreshTokenAction()).unwrap(); 
                return api(originalRequest);
            } catch (refreshError) {
                window.location.href = '/login'; 
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default api;