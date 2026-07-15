
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import schemeService from "../../services/schemeService";

// Fetch Scheme By Slug
export const fetchSchemeBySlug = createAsyncThunk(
    "scheme/fetchSchemeBySlug",
    async (slug, { rejectWithValue }) => {
        try {
            const data = await schemeService.getSchemeBySlug(slug);
            return data; 
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const initialState = {
    scheme: null,
    relatedSchemes: [],
    loading: false,
    error: null,
};

const schemeSlice = createSlice({
    name: "scheme",
    initialState,
    reducers: {
        clearSchemeState: (state) => {
            state.scheme = null;
            state.relatedSchemes = [];
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSchemeBySlug.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSchemeBySlug.fulfilled, (state, action) => {
                state.loading = false;
                state.scheme = action.payload.data.scheme;
                state.relatedSchemes = action.payload.data.relatedSchemes;
            })
            .addCase(fetchSchemeBySlug.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { clearSchemeState } = schemeSlice.actions;
export default schemeSlice.reducer;