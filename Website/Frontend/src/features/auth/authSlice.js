
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../services/authService";

export const login = createAsyncThunk("auth/login", async (credentials, thunkAPI) => {
    try {
        return await authService.login(credentials);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Login failed");
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
            });
    }
});

export const { setUser, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;