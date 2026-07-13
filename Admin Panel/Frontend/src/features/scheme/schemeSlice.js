
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import schemeService from '../../services/schemeService';

export const fetchAllSchemes = createAsyncThunk('scheme/fetchAll', async (params, thunkAPI) => {
    try { return await schemeService.getAllSchemes(params); }
    catch (error) { return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch Schemes'); }
});

export const createNewScheme = createAsyncThunk(
    'scheme/create',
    async (formData, thunkAPI) => {
        try {
            return await schemeService.createScheme(formData);
        } catch (error) {
            return thunkAPI.rejectWithValue(
            error.response?.data?.message || 'Failed to create Scheme'
            );
        }
    }
);

export const updateSchemeThunk = createAsyncThunk(
    "scheme/update",
    async ({ id, formData }, thunkAPI) => {
        try {
            return await schemeService.updateScheme(id, formData);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to update scheme"
            );
        }
    }
);

export const deleteSchemeThunk = createAsyncThunk(
    "scheme/delete",
    async (id, thunkAPI) => {
        try {
            await schemeService.deleteScheme(id);
            return id;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to delete scheme"
            );
        }
    }
);

const schemeSlice = createSlice({
    name: 'scheme',
    initialState: { 
        items: [], 
        currentItem: null,
        isLoading: false, 
        isError: false, 
        message: '' 
    },
    reducers: {
        resetState: (state) => {
            state.items = [];
            state.currentItem = null;
            state.isError = false;
        }
    },    
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllSchemes.pending, (state) => { state.isLoading = true; })
            .addCase(fetchAllSchemes.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(fetchAllSchemes.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            // Create
            .addCase(createNewScheme.pending, (state) => { state.isLoading = true; })
            .addCase(createNewScheme.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items.unshift(action.payload);
            })
            .addCase(createNewScheme.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            // Update
            .addCase(updateSchemeThunk.fulfilled, (state, action) => {
                state.isLoading = false;

                const index = state.items.findIndex(
                    item => item._id === action.payload._id
                );

                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })

            // Delete
            .addCase(deleteSchemeThunk.fulfilled, (state, action) => {
                state.isLoading = false;

                state.items = state.items.filter(
                    item => item._id !== action.payload
                );
            })
    }
});

export const { resetState } = schemeSlice.actions;
export default schemeSlice.reducer;