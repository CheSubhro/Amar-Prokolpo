
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
                state.user = action.payload.data || action.payload; 
                state.isAuthenticated = true; 
            })
            .addCase(loginUser.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; })
            // Get Current User
            .addCase(getCurrentUser.pending, (state) => { state.isInitialLoading = true; })
            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.isInitialLoading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(getCurrentUser.rejected, (state) => {
                state.isInitialLoading = false;
                state.isAuthenticated = false;
                state.user = null;
            })
        }       
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;