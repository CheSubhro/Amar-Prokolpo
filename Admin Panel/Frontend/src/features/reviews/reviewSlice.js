
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import reviewService from '../../services/reviewService';

export const addReview = createAsyncThunk('review/add', async (reviewData, thunkAPI) => {
    try {
        return await reviewService.addReview(reviewData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to submit review");
    }
});

export const getReviewsBySchemeId = createAsyncThunk('review/getBySchemeId', async (schemeId, thunkAPI) => {
    try {
        return await reviewService.getReviewsBySchemeId(schemeId);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch reviews");
    }
});

const reviewSlice = createSlice({
    name: 'reviews',
    initialState: {
        reviews: [],
        isLoading: false,
        error: null,
        successMessage: null,
    },
    reducers: {
        clearReviewMessages: (state) => {
            state.error = null;
            state.successMessage = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Add Review
            .addCase(addReview.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(addReview.fulfilled, (state, action) => {
                state.isLoading = false;
                state.successMessage = "Review submitted successfully!";
                state.reviews.unshift(action.payload.data); 
            })
            .addCase(addReview.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Get Reviews By Scheme Id
            .addCase(getReviewsBySchemeId.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getReviewsBySchemeId.fulfilled, (state, action) => {
                state.isLoading = false;
                state.reviews = action.payload.data; 
            })
            .addCase(getReviewsBySchemeId.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export const { clearReviewMessages } = reviewSlice.actions;
export default reviewSlice.reducer;