
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory
} from '../../services/categoryService';

export const fetchCategories = createAsyncThunk('category/fetchAll', async () => {
    return await getAllCategories();
});

export const addCategory = createAsyncThunk('category/add', async (formData) => {
    return await createCategory(formData);
});

export const updateCategoryThunk = createAsyncThunk('category/update', async ({ id, formData }) => {
    return await updateCategory(id, formData);
});

export const deleteCategoryThunk = createAsyncThunk("category/delete",async (id) => {
    await deleteCategory(id);
    return id;
    }
  );

const categorySlice = createSlice({
    name: 'category',
    initialState: { list: [], loading: false },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => { state.loading = true; })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(addCategory.fulfilled, (state, action) => {
                state.list.push(action.payload.data); 
            })
            .addCase(updateCategoryThunk.fulfilled, (state, action) => {
                const index = state.list.findIndex(cat => cat._id === action.payload.data._id);
                if (index !== -1) state.list[index] = action.payload.data;
            })
            .addCase(deleteCategoryThunk.fulfilled, (state, action) => {
                state.list = state.list.filter(cat => cat._id !== action.payload);
            });
    }
});

export default categorySlice.reducer;