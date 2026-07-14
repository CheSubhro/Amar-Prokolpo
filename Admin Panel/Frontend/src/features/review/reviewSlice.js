
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import reviewService from "../../services/reviewService";

// Fetch Pending Reviews
export const fetchPendingReviews = createAsyncThunk(
    "review/pending",
    async (_, thunkAPI) => {
        try {
            return await reviewService.getPendingReviews();
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to fetch reviews"
            );
        }
    }
);

// Update Review Status
export const changeReviewStatus = createAsyncThunk(
    "review/status",
    async ({ reviewId, status }, thunkAPI) => {
        try {
            return await reviewService.updateReviewStatus(reviewId, status);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to update review"
            );
        }
    }
);

const reviewSlice = createSlice({
    name: "review",
    initialState: {
        reviews: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Pending Reviews
            .addCase(fetchPendingReviews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPendingReviews.fulfilled, (state, action) => {
                state.loading = false;
                state.reviews = action.payload;
            })
            .addCase(fetchPendingReviews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Update Status (Remove from list)
            .addCase(changeReviewStatus.fulfilled, (state, action) => {
                state.reviews = state.reviews.filter(
                    (review) => review._id !== action.payload._id
                );
            });
    },
});

export default reviewSlice.reducer;