
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from '../../services/userService';

export const getAllUsers = createAsyncThunk('users/getAll', async (_, thunkAPI) => {
    try {
        return await userService.getAllUsers();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch users");
    }
});

const userSlice = createSlice({
    name: 'users',
    initialState: { users: [], isLoading: false, error: null },
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.pending, (state) => { state.isLoading = true; })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = action.payload.data; 
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export default userSlice.reducer;