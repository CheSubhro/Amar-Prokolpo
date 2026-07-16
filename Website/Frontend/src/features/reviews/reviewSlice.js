
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import reviewService from "../../services/reviewService";

export const fetchReviews = createAsyncThunk("reviews/fetch", async (schemeId, thunkAPI) => {
    try {
        return await reviewService.getApprovedReviews(schemeId);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch");
    }
});

export const fetchAllReviews = createAsyncThunk("reviews/fetchAll", async (_, thunkAPI) => {
    try {
        return await reviewService.getAllApprovedReviews();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch");
    }
});

export const postReview = createAsyncThunk("reviews/add", async (reviewData, thunkAPI) => {
    try {
        return await reviewService.addReview(reviewData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to post review");
    }
});

const reviewSlice = createSlice({
    name: "reviews",
    initialState: { items: [], loading: false, error: null },
    extraReducers: (builder) => {
        builder
            .addCase(fetchReviews.pending, (state) => { state.loading = true; })
            .addCase(fetchReviews.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.data;
            })
            .addCase(fetchReviews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchAllReviews.pending, (state) => { state.loading = true; })
            .addCase(fetchAllReviews.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.data;
            })
            .addCase(fetchAllReviews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(postReview.fulfilled, (state, action) => {
                state.items.unshift(action.payload.data); 
            })
    }
});

export default reviewSlice.reducer;