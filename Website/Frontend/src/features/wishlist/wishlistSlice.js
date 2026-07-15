
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import wishlistService from "../../services/wishlistService";

export const fetchWishlist = createAsyncThunk("wishlist/fetch", async (_, thunkAPI) => {
    try {
        return await wishlistService.getWishlist();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch wishlist");
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
                state.items = action.payload.data;
            })
            .addCase(fetchWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default wishlistSlice.reducer;