

import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../features/auth/authSlice";
import homeReducer from "../features/home/homeSlice";
import schemeReducer from "../features/scheme/schemeSlice";
import savedSchemeReducer from "../features/savedScheme/savedSchemeSlice";
import reviewReducer from "../features/reviews/reviewSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        home: homeReducer,
        scheme:schemeReducer,
        savedScheme: savedSchemeReducer,
        reviews: reviewReducer
    },
});