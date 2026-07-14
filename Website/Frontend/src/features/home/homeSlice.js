
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import homeService from "../../services/homeService";

// Fetch Categories
export const fetchCategories = createAsyncThunk(
    "home/fetchCategories",
    async (_, { rejectWithValue }) => {
        try {
        const response = await homeService.getCategories();
        return response.data;
        } catch (error) {
        return rejectWithValue(error.message || "Failed to fetch categories");
        }
    }
);

const initialState = {
    categories: [],
    loading: false,
    error: null,
};

const dashboardSlice = createSlice({
    name: "home",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchCategories.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchCategories.fulfilled, (state, action) => {
            state.loading = false;
            state.categories = action.payload;
        })
        .addCase(fetchCategories.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export default dashboardSlice.reducer;