
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import schemeService from '../../services/schemeService';

export const fetchAllSchemes = createAsyncThunk('scheme/fetchAll', async (params, thunkAPI) => {
    try { return await schemeService.getAllSchemes(params); }
    catch (error) { return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch Schemes'); }
});

export const createNewScheme = createAsyncThunk('scheme/create', async (formData, thunkAPI) => {
    try { return await schemeService.createScheme(data); } 
    catch (error) { return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to create Scheme'); }
});

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
            });
    }
});

export const { resetState } = schemeSlice.actions;
export default schemeSlice.reducer;