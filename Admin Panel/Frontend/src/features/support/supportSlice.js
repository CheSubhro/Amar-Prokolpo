
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supportService from "../../services/supportService";


export const fetchAllTickets = createAsyncThunk(
    "support/getAll",
    async (_, thunkAPI) => {
        try {
            return await supportService.getAllTickets();
        } catch(error){
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch tickets"
            );
        }
    }
);


export const replyTicket = createAsyncThunk(
    "support/respond",
    async ({ticketId, data}, thunkAPI)=>{
        try{
            return await supportService.respondToTicket(
                ticketId,
                data
            );
        }
        catch(error){
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Failed to respond"
            );
        }
    }
);

const supportSlice = createSlice({
    name:"support",
    initialState:{
        tickets:[],
        loading:false,
        error:null,
        message:""
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        // Get Tickets
        .addCase(fetchAllTickets.pending,(state)=>{
            state.loading=true;
        })
        .addCase(fetchAllTickets.fulfilled,(state,action)=>{
            state.loading=false;
            state.tickets=action.payload;
        })
        .addCase(fetchAllTickets.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        })
        // Reply
        .addCase(replyTicket.fulfilled,(state,action)=>{
            const index = state.tickets.findIndex(
                ticket=>ticket._id === action.payload._id
            );
            if(index !== -1){
                state.tickets[index]=action.payload;
            }
        });
    }
});


export default supportSlice.reducer;