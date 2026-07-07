
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import categoryService from '../../services/categoryService';

export const createCategory = createAsyncThunk('category/create', async (formData, thunkAPI) => {
    try {
        return await categoryService.createCategory(formData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || "Failed to create category");
    }
});

export const getAllCategories = createAsyncThunk('category/getAll', async (_, thunkAPI) => {
    try {
        return await categoryService.getAllCategories();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch categories");
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
            // Create Category
            .addCase(createCategory.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.successMessage = "Category created successfully!";
                
                if (action.payload.data) {
                    state.categories.unshift(action.payload.data);
                }
                
                state.error = null;
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Get All Categories
            .addCase(getAllCategories.pending, (state) => {
                state.isLoading = true;
                state.error = null; 
            })
            .addCase(getAllCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.categories = action.payload.data;
            })
            .addCase(getAllCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export default categorySlice.reducer;