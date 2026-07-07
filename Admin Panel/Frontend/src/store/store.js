
import { configureStore } from '@reduxjs/toolkit';
import logReducer from '../features/logs/logSlice'
import authReducer from '../features/auth/authSlice'; 
import userReducer from '../features/users/userSlice'

const store = configureStore({
    reducer: {
        auth: authReducer, 
        users: userReducer,
        logs: logReducer,
    },
});

export default store;