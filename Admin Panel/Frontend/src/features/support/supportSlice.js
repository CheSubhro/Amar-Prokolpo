
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import supportService from '../../services/supportService';

export const createTicket = createAsyncThunk('support/create', async (ticketData, thunkAPI) => {
    try {
        return await supportService.createTicket(ticketData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to create ticket");
    }
});

const supportSlice = createSlice({
    name: 'support',
    initialState: {
        tickets: [],
        isLoading: false,
        error: null,
        successMessage: null,
    },
    reducers: {
        resetSupportState: (state) => {
            state.isLoading = false;
            state.error = null;
            state.successMessage = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTicket.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(createTicket.fulfilled, (state, action) => {
                state.isLoading = false;
                state.successMessage = "Ticket created successfully! Our team will contact you soon.";
                state.tickets.unshift(action.payload.data);
            })
            .addCase(createTicket.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export const { resetSupportState } = supportSlice.actions;
export default supportSlice.reducer;