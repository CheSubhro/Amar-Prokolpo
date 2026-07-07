
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

export const updateUserDetails = createAsyncThunk('users/updateProfile', async ({ userId, formData }, thunkAPI) => {
    try {
        return await userService.updateUserDetails(userId, formData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || "Failed to update profile");
    }
});

const userSlice = createSlice({
    name: 'users',
    initialState: { 
        users: [], 
        selectedUser: null, 
        isLoading: false,
        error: null,
        successMessage: null, 
    },
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
            // Update User Details
            .addCase(updateUserDetails.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.successMessage = null; 
            })
            .addCase(updateUserDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.selectedUser = action.payload.data; 
                state.successMessage = action.payload.message || "Profile updated successfully!";
                state.error = null;
            })
            .addCase(updateUserDetails.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.successMessage = null;
            })
    }
});

export default userSlice.reducer;