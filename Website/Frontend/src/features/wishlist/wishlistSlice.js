
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import wishlistService from "../../services/wishlistService";

export const fetchWishlist = createAsyncThunk("wishlist/fetch", async (_, thunkAPI) => {
    try {
        return await wishlistService.getWishlist();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch wishlist");
    }
});

export const addToWishlistThunk = createAsyncThunk("wishlist/add", async (data, thunkAPI) => {
    try {
        const response = await wishlistService.addToWishlist(data);
        return response; 
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed");
    }
});

export const removeFromWishlistThunk = createAsyncThunk("wishlist/remove", async (wishlistId, thunkAPI) => {
    try {
        await wishlistService.removeFromWishlist(wishlistId);
        return wishlistId;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to remove");
    }
});

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: { items: [], loading: false, error: null },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWishlist.pending, (state) => { state.loading = true; })
            .addCase(fetchWishlist.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.data || action.payload;
            })
            .addCase(fetchWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Add
            
            .addCase(addToWishlistThunk.pending,(state)=>{
                state.loading=true;
            })
            
            .addCase(addToWishlistThunk.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload;
            })
            
            .addCase(addToWishlistThunk.fulfilled,(state,action)=>{
                state.loading=false;
                state.items.push(action.payload.data);
            })
            // Remove
            .addCase(removeFromWishlistThunk.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item._id !== action.payload);
            });
    }
});

export default wishlistSlice.reducer;