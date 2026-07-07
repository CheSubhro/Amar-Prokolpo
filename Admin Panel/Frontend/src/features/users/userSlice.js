
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from '../../services/userService';

export const getAllUsers = createAsyncThunk('users/getAll', async (_, thunkAPI) => {
    try {
        return await userService.getAllUsers();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch users");
    }
});

export const getUserProfile = createAsyncThunk('users/getProfile', async (username, thunkAPI) => {
    try {
        return await userService.getUserProfile(username);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch profile");
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
            })

            .addCase(getUserProfile.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.selectedUser = action.payload.data;
            })
    }
});

export default userSlice.reducer;