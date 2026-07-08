
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import wishlistService from '../../services/wishlistService';

export const addToWishlist = createAsyncThunk('wishlist/add', async (wishlistData, thunkAPI) => {
    try {
        return await wishlistService.addToWishlist(wishlistData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to add to wishlist");
    }
});

export const removeFromWishlist = createAsyncThunk('wishlist/remove', async (wishlistId, thunkAPI) => {
    try {
        return await wishlistService.removeFromWishlist(wishlistId);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to remove from wishlist");
    }
});

export const getWishlist = createAsyncThunk('wishlist/fetchAll', async (_, thunkAPI) => {
    try {
        return await wishlistService.getWishlist();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch wishlist");
    }
});

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: {
        items: [],
        isLoading: false,
        error: null,
        successMessage: null,
    },
    reducers: {
        clearWishlistMessages: (state) => {
            state.error = null;
            state.successMessage = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Add To Wishlist
            .addCase(addToWishlist.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(addToWishlist.fulfilled, (state, action) => {
                state.isLoading = false;
                state.successMessage = "Added to your wishlist!";
                state.items.push(action.payload.data);
            })
            .addCase(addToWishlist.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Remove From Wishlist
            .addCase(removeFromWishlist.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(removeFromWishlist.fulfilled, (state, action) => {
                state.isLoading = false;
                state.successMessage = "Removed from wishlist successfully!";
                state.items = state.items.filter(item => item._id !== action.meta.arg);
            })
            .addCase(removeFromWishlist.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Get Wishlist
            .addCase(getWishlist.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getWishlist.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload.data; 
            })
            .addCase(getWishlist.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export const { clearWishlistMessages } = wishlistSlice.actions;
export default wishlistSlice.reducer;