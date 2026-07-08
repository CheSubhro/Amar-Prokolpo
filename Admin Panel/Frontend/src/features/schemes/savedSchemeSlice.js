
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import savedSchemeService from '../../services/savedSchemeService';

export const toggleSaveScheme = createAsyncThunk('savedScheme/toggle', async (schemeId, thunkAPI) => {
    try {
        return await savedSchemeService.toggleSaveScheme(schemeId);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Operation failed");
    }
});

const savedSchemeSlice = createSlice({
    name: 'savedSchemes',
    initialState: {
        savedList: [], 
        isLoading: false,
    },
    extraReducers: (builder) => {
        builder
            .addCase(toggleSaveScheme.fulfilled, (state, action) => {
                const { schemeId, isSaved } = action.payload.data; 
                if (isSaved) {
                    state.savedList.push(schemeId);
                } else {
                    state.savedList = state.savedList.filter(id => id !== schemeId);
                }
            });
    }
});

export default savedSchemeSlice.reducer;