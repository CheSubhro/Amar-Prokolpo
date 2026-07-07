
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import categoryService from '../../services/categoryService';

export const createCategory = createAsyncThunk('category/create', async (formData, thunkAPI) => {
    try {
        return await categoryService.createCategory(formData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || "Failed to create category");
    }
});

const categorySlice = createSlice({
    name: 'categories',
    initialState: {
        categories: [],
        isLoading: false,
        error: null,
        successMessage: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createCategory.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.successMessage = "Category created successfully!";
                // নতুন তৈরি হওয়া ক্যাটাগরি লিস্টে যোগ করতে পারেন
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export default categorySlice.reducer;