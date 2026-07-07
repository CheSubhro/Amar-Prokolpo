
import { configureStore } from '@reduxjs/toolkit';
import logReducer from '../features/logs/logSlice'
import authReducer from '../features/auth/authSlice'
import userReducer from '../features/users/userSlice'
import categoryReducer from '../features/categories/categorySlice'

const store = configureStore({
    reducer: {
        auth: authReducer, 
        users: userReducer,
        logs: logReducer,
        categories: categoryReducer,
    },
});

export default store;