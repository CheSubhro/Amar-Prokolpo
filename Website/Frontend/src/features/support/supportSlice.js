
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supportService } from "../../services/supportService";

export const createTicketThunk = createAsyncThunk(
    "support/create",
    async (ticketData, { rejectWithValue }) => {
        try {
            const response = await supportService.createTicket(ticketData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to submit ticket");
        }
    }
);

const supportSlice = createSlice({
    name: "support",
    initialState: {
        loading: false,
        success: false,
        error: null,
    },
    reducers: {
        resetSupportState: (state) => {
            state.loading = false;
            state.success = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTicketThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(createTicketThunk.fulfilled, (state) => {
                state.loading = false;
                state.success = true; 
            })
            .addCase(createTicketThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; 
            });
    },
});

export const { resetSupportState } = supportSlice.actions;
export default supportSlice.reducer;