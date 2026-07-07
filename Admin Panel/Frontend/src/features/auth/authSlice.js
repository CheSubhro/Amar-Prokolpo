
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../services/authService';

export const loginUser = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
    try {
        return await authService.login(userData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const getCurrentUser = createAsyncThunk('auth/getCurrentUser', async (_, thunkAPI) => {
    try {
        return await authService.getCurrentUser();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch user");
    }
});

export const registerUser = createAsyncThunk('auth/register', async (formData, thunkAPI) => {
    try {
        return await authService.register(formData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || "Registration failed");
    }
});

export const logoutUser = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
    try {
        await authService.logout();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const changePassword = createAsyncThunk('auth/changePassword', async (passwords, thunkAPI) => {
    try {
        return await authService.changePassword(passwords);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || "Password change failed");
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState: { 
        user: null, 
        isLoading: false, 
        error: null,
        isAuthenticated: false, 
        isInitialLoading: true 
    },
    reducers: {
        reset: (state) => { state.isLoading = false; state.error = null; }
    },
    extraReducers: (builder) => {
        builder
            // LoginUser
            .addCase(loginUser.pending, (state) => { state.isLoading = true; })
            .addCase(loginUser.fulfilled, (state, action) => { 
                state.isLoading = false; 
                state.user = action.payload.data.user;
                state.isAuthenticated = true; 
            })
            .addCase(loginUser.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; })
            // Get Current User
            .addCase(getCurrentUser.pending, (state) => { state.isInitialLoading = true; })
            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.isInitialLoading = false;
                state.user = action.payload.data.user;
                state.isAuthenticated = true;
            })
            .addCase(getCurrentUser.rejected, (state) => {
                state.isInitialLoading = false;
                state.isAuthenticated = false;
                state.user = null;
            })
            // Register Admin
            .addCase(registerUser.pending, (state) => { state.isLoading = true; })
            .addCase(registerUser.fulfilled, (state) => { state.isLoading = false; })
            .addCase(registerUser.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; })
            
            // Logout Admin
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.isAuthenticated = false;
            })
            // Change Password
            .addCase(changePassword.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(changePassword.fulfilled, (state) => {
                state.isLoading = false;
                state.error = null;
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
        }       
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;