
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dashboardService from "../../services/dashboardService";

export const fetchDashboard = createAsyncThunk(
    "dashboard/fetch",
    async (_, thunkAPI) => {
        try {
            return await dashboardService.getDashboardData();
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Dashboard loading failed"
            );
        }
    }
);

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState: {
        schemes: [],
        topSchemes: [],
        tickets: [],
        reviews: [],
        notifications: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDashboard.pending, (state) => {
                state.loading = true;
                state.error = null; 
            })
            .addCase(fetchDashboard.fulfilled,(state,action)=>{

                state.loading=false;
            
            
                state.schemes =
                    Array.isArray(action.payload.schemes)
                    ? action.payload.schemes
                    : [];
            
            
                state.topSchemes =
                    Array.isArray(action.payload.topSchemes)
                    ? action.payload.topSchemes
                    : [];
            
            
                state.tickets =
                    Array.isArray(action.payload.tickets)
                    ? action.payload.tickets
                    : [];
            
            
                state.reviews =
                    Array.isArray(action.payload.reviews)
                    ? action.payload.reviews
                    : [];
            
            
                state.notifications =
                    Array.isArray(action.payload.notifications)
                    ? action.payload.notifications
                    : [];
            
            })
            .addCase(fetchDashboard.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default dashboardSlice.reducer;