
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api'; 

export const fetchDashboardData = createAsyncThunk('dashboard/fetchData', async () => {
    const response = await api.get('/dashboard-stats'); 
    return response.data;
});

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: { data: null, loading: false },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDashboardData.pending, (state) => { state.loading = true; })
            .addCase(fetchDashboardData.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            });
    },
});

export default dashboardSlice.reducer;