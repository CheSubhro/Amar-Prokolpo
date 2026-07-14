
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../services/authService';

export const loginUser = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
    try {
        return await authService.login(userData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Login failed');
    }
});

export const getCurrentUser = createAsyncThunk('auth/getCurrentUser', async (_, thunkAPI) => {
    try {
        return await authService.getCurrentUser();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Unauthorized');
    }
});

export const logoutUser = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
    try {
        await authService.logout();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Logout failed');
    }
});

export const changePassword = createAsyncThunk(
    'auth/changePassword',
    async (passwordData, thunkAPI) => {
        try {
            return await authService.changePassword(passwordData);
        } catch(error){
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || 
                "Password change failed"
            );
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isLoading: false,
        isError: false,
        message: '',
    },
    reducers: {
        resetAuth: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => { state.isLoading = true; })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.user = action.payload; 
            })
            .addCase(getCurrentUser.rejected, (state) => {
                state.user = null; 
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
            })
            .addCase(changePassword.pending,(state)=>{
                state.isLoading = true;
            })
            .addCase(changePassword.fulfilled,(state)=>{
                state.isLoading = false;
                state.message="Password changed successfully";
            })
            .addCase(changePassword.rejected,(state,action)=>{
                state.isLoading=false;
                state.isError=true;
                state.message=action.payload;
            })
    },
});

export const { resetAuth } = authSlice.actions;
export default authSlice.reducer;