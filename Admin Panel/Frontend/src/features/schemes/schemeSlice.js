
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import schemeService from '../../services/schemeService';

export const createScheme = createAsyncThunk('scheme/create', async (formData, thunkAPI) => {
    try {
        return await schemeService.createScheme(formData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || "Failed to create scheme");
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
            });
    }
});

export default schemeSlice.reducer;