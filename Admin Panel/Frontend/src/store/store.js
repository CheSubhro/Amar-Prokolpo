
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import userReducer from '../features/user/userSlice';
import schemeReducer from '../features/scheme/schemeSlice';
import categoryReducer from '../features/category/categorySlice';
import supportReducer from '../features/support/supportSlice';
import notificationReducer from '../features/notification/notificationSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        scheme: schemeReducer,
        category: categoryReducer,
        support: supportReducer,
        notification: notificationReducer
    },
});