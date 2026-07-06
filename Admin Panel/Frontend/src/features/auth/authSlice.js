
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../services/authService';

export const loginUser = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
    try {
        return await authService.login(userData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null, isLoading: false, error: null },
    reducers: {
        reset: (state) => { state.isLoading = false; state.error = null; }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => { state.isLoading = true; })
            .addCase(loginUser.fulfilled, (state, action) => { state.isLoading = false; state.user = action.payload; })
            .addCase(loginUser.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; });
    }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;