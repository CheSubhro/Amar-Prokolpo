
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

export const deleteScheme = createAsyncThunk('scheme/delete', async (schemeId, thunkAPI) => {
    try {
        await schemeService.deleteScheme(schemeId);
        return schemeId; 
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to delete scheme");
    }
});

const schemeSlice = createSlice({
    name: 'schemes',
    initialState: {
        schemes: [],           
        selectedScheme: null,  
        isLoading: false,      
        error: null,           
        successMessage: null,  
        pagination: {          
            currentPage: 1,
            totalPages: 0,
            totalItems: 0
        }
    },
    reducers: {
        clearMessages: (state) => {
            state.successMessage = null;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Create Scheme
            .addCase(createScheme.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(createScheme.fulfilled, (state, action) => {
                state.isLoading = false;
                state.successMessage = "Scheme created successfully!";
                state.schemes.unshift(action.payload.data);
            })
            .addCase(createScheme.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || "Failed to create scheme, please try again later.";
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
            // Delete Scheme
            .addCase(deleteScheme.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteScheme.fulfilled, (state, action) => {
                state.isLoading = false;
                state.successMessage = "Scheme deleted successfully!";
                state.schemes = state.schemes.filter(scheme => scheme._id !== action.payload);
            })
            .addCase(deleteScheme.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export default schemeSlice.reducer;