
import { configureStore } from '@reduxjs/toolkit';
import logReducer from '../features/logs/logSlice'
import authReducer from '../features/auth/authSlice'
import userReducer from '../features/users/userSlice'
import categoryReducer from '../features/categories/categorySlice'
import schemeReducer from '../features/schemes/schemeSlice'
import savedschemeReducer from '../features/savedSchemes/savedSchemeSlice'
import reviewReducer from '../features/reviews/reviewSlice'
import notificationReducer from '../features/notifications/notificationSlice'
import supportReducer from '../features/support/supportSlice'
import wishlistReducer from '../features/wishlist/wishlistSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer, 
        users: userReducer,
        logs: logReducer,
        categories: categoryReducer,
        schemes: schemeReducer,
        savedschemes: savedschemeReducer,
        review: reviewReducer,
        notification:notificationReducer,
        support: supportReducer,
        wishlist: wishlistReducer,
    },
});

export default store;