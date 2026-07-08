
import { configureStore } from '@reduxjs/toolkit';
import logReducer from '../features/logs/logSlice'
import authReducer from '../features/auth/authSlice'
import userReducer from '../features/users/userSlice'
import categoryReducer from '../features/categories/categorySlice'
import schemeReducer from '../features/schemes/schemeSlice'
import supportReducer from '../features/support/supportSlice'

const store = configureStore({
    reducer: {
        auth: authReducer, 
        users: userReducer,
        logs: logReducer,
        categories: categoryReducer,
        schemes: schemeReducer,
        support: supportReducer,
    },
});

export default store;