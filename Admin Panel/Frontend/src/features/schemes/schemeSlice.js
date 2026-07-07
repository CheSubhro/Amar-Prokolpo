
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import schemeService from '../../services/schemeService';

export const createScheme = createAsyncThunk('scheme/create', async (formData, thunkAPI) => {
    try {
        return await schemeService.createScheme(formData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || "Failed to create scheme");
    }
});

export const getAllSchemes = createAsyncThunk('scheme/getAll', async (_, thunkAPI) => {
    try {
        return await schemeService.getAllSchemes();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch schemes");
    }
});

const schemeSlice = createSlice({
    name: 'schemes',
    initialState: {
        schemes: [],
        isLoading: false,
        error: null,
        successMessage: null,
    },
    extraReducers: (builder) => {
        builder
            // Create Scheme
            .addCase(createScheme.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createScheme.fulfilled, (state, action) => {
                state.isLoading = false;
                state.successMessage = "Scheme created successfully!";
                state.schemes.unshift(action.payload.data);
            })
            .addCase(createScheme.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Get All Schemes
            .addCase(getAllSchemes.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getAllSchemes.fulfilled, (state, action) => {
                state.isLoading = false;
                state.schemes = action.payload.data; 
            })
            .addCase(getAllSchemes.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || "Failed to fetch schemes, please try again later.";
            })
    }
});

export default schemeSlice.reducer;