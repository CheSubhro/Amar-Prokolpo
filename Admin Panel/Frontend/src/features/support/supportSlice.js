
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import supportService from '../../services/supportService';

export const createTicket = createAsyncThunk('support/create', async (ticketData, thunkAPI) => {
    try {
        return await supportService.createTicket(ticketData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to create ticket");
    }
});

export const respondToTicket = createAsyncThunk('support/respond', async ({ ticketId, responseData }, thunkAPI) => {
    try {
        return await supportService.respondToTicket(ticketId, responseData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to send response");
    }
});

export const getAllTickets = createAsyncThunk('support/getAll', async (_, thunkAPI) => {
    try {
        return await supportService.getAllTickets();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch tickets");
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
            //Create Ticket
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
            })
            // Respond To Ticket
            .addCase(respondToTicket.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(respondToTicket.fulfilled, (state, action) => {
                state.isLoading = false;
                state.successMessage = "Response sent successfully!";
                const updatedTicket = action.payload.data;
                const index = state.tickets.findIndex(t => t._id === updatedTicket._id);
                if (index !== -1) {
                    state.tickets[index] = updatedTicket;
                }
            })
            .addCase(respondToTicket.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Get All Tickets
            .addCase(getAllTickets.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getAllTickets.fulfilled, (state, action) => {
                state.isLoading = false;
                state.tickets = action.payload.data; 
            })
            .addCase(getAllTickets.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export const { resetSupportState } = supportSlice.actions;
export default supportSlice.reducer;