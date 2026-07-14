
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

export const fetchFeaturedSchemes = createAsyncThunk(
    "home/fetchFeaturedSchemes",
    async(_, {rejectWithValue})=>{
        try{
            const response = await homeService.getFeaturedSchemes();
            return response.data.schemes;
        }catch(error){
            return rejectWithValue(error.message);
        }
    }
);

export const fetchTopViewedSchemes = createAsyncThunk(
    "home/fetchTopViewedSchemes",
    async(_, {rejectWithValue})=>{
        try{
            const response = await homeService.getTopViewedSchemes();
            return response.data;
        }catch(error){
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    categories: [],
    featuredSchemes:[],
    topViewedSchemes: [],
    loading: false,
    error: null,
};

const homeSlice = createSlice({
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
        })
        .addCase(
            fetchFeaturedSchemes.fulfilled,(state,action)=>{
                state.loading=false;
                state.featuredSchemes = action.payload;
        })
        .addCase(
            fetchFeaturedSchemes.pending,(state)=>{
                state.loading=true;
            }
        )
        .addCase(
            fetchFeaturedSchemes.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload;
            }
        )
        .addCase(
            fetchTopViewedSchemes.fulfilled,(state,action)=>{
                state.loading=false;
                state.topViewedSchemes = action.payload;
            }
        )
    },
});

export default homeSlice.reducer;