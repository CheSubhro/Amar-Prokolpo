
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllCategories } from '../../services/categoryService';

export const fetchCategories = createAsyncThunk('category/fetchAll', async () => {
    return await getAllCategories();
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
            });
    }
});

export default categorySlice.reducer;