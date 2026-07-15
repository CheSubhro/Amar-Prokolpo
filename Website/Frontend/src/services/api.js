
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api/v1',
    withCredentials: true, 
});



api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            return Promise.resolve({ data: null }); 
        }
        return Promise.reject(error);
    }
);

export default api;