
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from '../../services/userService';


export const fetchAllUsers = createAsyncThunk('data/fetchAll', async (params, thunkAPI) => {
    try { return await userService.getAllUsers(params); } 
    catch (error) { return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch Users'); }
});

const userSlice = createSlice({
    name: 'user',
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
            state.isError = false;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch All User 
            .addCase(fetchAllUsers.pending, (state) => { state.isLoading = true; })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
});

export const { resetState } = userSlice.actions;
export default userSlice.reducer;