

import { configureStore } from '@reduxjs/toolkit';
import homeReducer from "../features/home/homeSlice";
import schemeReducer from "../features/scheme/schemeSlice";
import savedSchemeReducer from "../features/savedScheme/savedSchemeSlice";

export const store = configureStore({
    reducer: {
        home: homeReducer,
        scheme:schemeReducer,
        savedScheme: savedSchemeReducer,
    },
});