
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import notificationService from "../../services/notificationService";

// Fetch All Notifications
export const fetchNotifications = createAsyncThunk(
    "notification/getAll",
    async (_, thunkAPI) => {
        try {
            return await notificationService.getNotifications();
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to fetch notifications"
            );
        }
    }
);

// Mark Notification as Read
export const readNotification = createAsyncThunk(
    "notification/read",
    async (notificationId, thunkAPI) => {
        try {
            await notificationService.markAsRead(notificationId);
            return notificationId;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to mark notification"
            );
        }
    }
);

const notificationSlice = createSlice({
    name: "notification",
    initialState: {
        notifications: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Notifications
            .addCase(fetchNotifications.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNotifications.fulfilled, (state, action) => {
                state.loading = false;
                state.notifications = action.payload;
            })
            .addCase(fetchNotifications.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Read Notification
            .addCase(readNotification.fulfilled, (state, action) => {
                const notification = state.notifications.find(
                    (item) => item._id === action.payload
                );
                if (notification) {
                    notification.isRead = true;
                }
            });
    },
});

export default notificationSlice.reducer;