
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllCategories, createCategory } from '../../services/categoryService';

export const fetchCategories = createAsyncThunk('category/fetchAll', async () => {
    return await getAllCategories();
});

export const addCategory = createAsyncThunk('category/add', async (formData) => {
    return await createCategory(formData);
});

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
            builder.addCase(addCategory.fulfilled, (state, action) => {
                state.list.push(action.payload.data); 
            });
    }
});

export default categorySlice.reducer;