
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../services/authService";

export const register = createAsyncThunk("auth/register", async (data, thunkAPI) => {
    try {
        return await authService.register(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Registration failed");
    }
});

export const login = createAsyncThunk("auth/login", async (credentials, thunkAPI) => {
    try {
        return await authService.login(credentials);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Login failed");
    }
});

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
    try {
        await authService.logout();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Logout failed");
    }
});

export const getCurrentUser = createAsyncThunk("auth/getCurrentUser", async (_, thunkAPI) => {
    try {
        return await authService.getCurrentUser();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "User not authenticated");
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState: { user: null, loading: false, error: null },
    reducers: {
        setUser: (state, action) => { state.user = action.payload; },
        logoutSuccess: (state) => { state.user = null; }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => { state.loading = true; })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data.user;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(register.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.user = action.payload.data; 
            })
            .addCase(getCurrentUser.rejected, (state) => {
                state.user = null; 
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null; 
                state.loading = false;
            });
    }
});

export const { setUser, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;