
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import savedSchemeService from "../../services/savedSchemeService";

// Async Thunk: Toggle Save Scheme
export const toggleSaveScheme = createAsyncThunk(
    "savedScheme/toggleSaveScheme",
    async (schemeId, { rejectWithValue }) => {
        try {
            const response = await savedSchemeService.toggleSaveScheme(schemeId);
            return { schemeId, ...response.data };
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || error.message || "Something went wrong"
            );
        }
    }
);

// Async Thunk: Fetch Saved Schemes
export const fetchSavedSchemes = createAsyncThunk(
    "savedScheme/fetchSavedSchemes",
    async (_, { rejectWithValue }) => {
        try {
            const response = await savedSchemeService.getSavedSchemes();
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || error.message || "Something went wrong"
            );
        }
    }
);

const initialState = {
    savedSchemes: [],
    loading: false,
    error: null,
};

const savedSchemeSlice = createSlice({
    name: "savedScheme",
    initialState,
    reducers: {
        clearSavedSchemes: (state) => {
        state.savedSchemes = [];
        state.loading = false;
        state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
        // Toggle Save Scheme Cases
        .addCase(toggleSaveScheme.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(toggleSaveScheme.fulfilled, (state, action) => {
            state.loading = false;
            const { schemeId, isSaved } = action.payload;

            if (!isSaved) {
            state.savedSchemes = state.savedSchemes.filter(
                (item) => item.scheme._id !== schemeId
            );
            }
        })
        .addCase(toggleSaveScheme.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        // Fetch Saved Schemes Cases
        .addCase(fetchSavedSchemes.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchSavedSchemes.fulfilled, (state, action) => {
            state.loading = false;
            state.savedSchemes = action.payload;
        })
        .addCase(fetchSavedSchemes.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const { clearSavedSchemes } = savedSchemeSlice.actions;
export default savedSchemeSlice.reducer;