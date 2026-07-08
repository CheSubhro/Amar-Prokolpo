
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import reviewService from '../../services/reviewService';

export const addReview = createAsyncThunk('review/add', async (reviewData, thunkAPI) => {
    try {
        return await reviewService.addReview(reviewData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to submit review");
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
            });
    }
});

export const { clearReviewMessages } = reviewSlice.actions;
export default reviewSlice.reducer;