
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import demoService from '../services/demoService';

// Thunks 
export const fetchItems = createAsyncThunk('data/fetchAll', async (params, thunkAPI) => {
    try { return await demoService.fetchAllItems(params); } 
    catch (error) { return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch items'); }
});

export const fetchItemById = createAsyncThunk('data/fetchById', async (id, thunkAPI) => {
    try { return await demoService.fetchItemById(id); } 
    catch (error) { return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch item'); }
});

export const createNewItem = createAsyncThunk('data/create', async (data, thunkAPI) => {
    try { return await demoService.createItem(data); } 
    catch (error) { return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to create item'); }
});

export const updateExistingItem = createAsyncThunk('data/update', async ({ id, data }, thunkAPI) => {
    try { return await demoService.updateItem(id, data); } 
    catch (error) { return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to update item'); }
});

export const deleteExistingItem = createAsyncThunk('data/delete', async (id, thunkAPI) => {
    try { await demoService.deleteItem(id); return id; } 
    catch (error) { return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to delete item'); }
});

const dataSlice = createSlice({
    name: 'data',
    initialState: {
        items: [],
        currentItem: null,
        isLoading: false,
        isError: false,
        message: '', 
    },
    reducers: {
        resetState: (state) => {
            state.items = [];
            state.currentItem = null;
            state.isLoading = false;
            state.isError = false;
            state.message = '';
        },
        clearMessage: (state) => { state.message = ''; }
    },
    extraReducers: (builder) => {
        builder
            // Helper for shared logic if needed, but explicit cases are better for readability
            // fetchItems
            .addCase(fetchItems.pending, (state) => { state.isLoading = true; state.isError = false; })
            .addCase(fetchItems.fulfilled, (state, action) => { state.isLoading = false; state.items = action.payload; })
            .addCase(fetchItems.rejected, (state, action) => { state.isLoading = false; state.isError = true; state.message = action.payload; })
            
            // fetchItemById
            .addCase(fetchItemById.fulfilled, (state, action) => { state.currentItem = action.payload; })
            
            // createNewItem
            .addCase(createNewItem.pending, (state) => { state.isLoading = true; })
            .addCase(createNewItem.fulfilled, (state, action) => { 
                state.isLoading = false; 
                state.items.push(action.payload);
                state.message = "Item created successfully!";
            })
            .addCase(createNewItem.rejected, (state, action) => { state.isLoading = false; state.isError = true; state.message = action.payload; })

            // updateExistingItem
            .addCase(updateExistingItem.pending, (state) => { state.isLoading = true; })
            .addCase(updateExistingItem.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = state.items.map(item => item._id === action.payload._id ? action.payload : item);
                state.message = "Item updated successfully!";
            })
            .addCase(updateExistingItem.rejected, (state, action) => { state.isLoading = false; state.isError = true; state.message = action.payload; })

            // deleteExistingItem
            .addCase(deleteExistingItem.pending, (state) => { state.isLoading = true; })
            .addCase(deleteExistingItem.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = state.items.filter(item => item._id !== action.payload);
                state.message = "Item deleted successfully!";
            })
            .addCase(deleteExistingItem.rejected, (state, action) => { state.isLoading = false; state.isError = true; state.message = action.payload; });
    },
});

export const { resetState, clearMessage } = dataSlice.actions;
export default dataSlice.reducer;