
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

export const getSchemeBySlug = createAsyncThunk('scheme/getBySlug', async (slug, thunkAPI) => {
    try {
        return await schemeService.getSchemeBySlug(slug);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch scheme details");
    }
});

export const getTopViewedSchemes = createAsyncThunk('scheme/getTopViewed', async (_, thunkAPI) => {
    try {
        return await schemeService.getTopViewedSchemes();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch top schemes");
    }
});

export const updateScheme = createAsyncThunk('scheme/update', async ({ schemeId, formData }, thunkAPI) => {
    try {
        return await schemeService.updateScheme(schemeId, formData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to update scheme");
    }
});

const schemeSlice = createSlice({
    name: 'schemes',
    initialState: {
        schemes: [], 
        topSchemes: [],          
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
                state.error = action.payload || "Failed to delete schemes, please try again later.";
            })
            // Get Scheme By Slug
            .addCase(getSchemeBySlug.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getSchemeBySlug.fulfilled, (state, action) => {
                state.isLoading = false;
                state.selectedScheme = action.payload.data; 
            })
            .addCase(getSchemeBySlug.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || "Failed to Get Scheme By Slug, please try again later.";
            })
            // Get Top Viewed Schemes
            .addCase(getTopViewedSchemes.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getTopViewedSchemes.fulfilled, (state, action) => {
                state.isLoading = false;
                state.topSchemes = action.payload.data; 
            })
            .addCase(getTopViewedSchemes.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || "Failed to Get Top Viewed Schemes, please try again later.";
            })
            // Update Scheme
            .addCase(updateScheme.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateScheme.fulfilled, (state, action) => {
                state.isLoading = false;
                state.successMessage = "Scheme updated successfully!";
                
                const index = state.schemes.findIndex(scheme => scheme._id === action.payload.data._id);
                if (index !== -1) {
                    state.schemes[index] = action.payload.data;
                }
                if (state.selectedScheme && state.selectedScheme._id === action.payload.data._id) {
                    state.selectedScheme = action.payload.data;
                }
            })
            .addCase(updateScheme.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || "Failed to Update Scheme, please try again later.";
            });
    }
});

export default schemeSlice.reducer;