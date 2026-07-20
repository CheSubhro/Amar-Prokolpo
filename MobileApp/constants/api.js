
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const BASE_URL = 'http://10.122.236.67:8000/api/v1';

const apiClient = axios.create({
    baseURL: BASE_URL,
});

apiClient.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default apiClient;