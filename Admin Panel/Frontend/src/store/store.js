
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import userReducer from '../features/user/userSlice';
import schemeReducer from '../features/scheme/schemeSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        scheme: schemeReducer,
    },
});