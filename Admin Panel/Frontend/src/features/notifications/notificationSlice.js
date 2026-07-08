
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import notificationService from '../../services/notificationService';

export const registerDeviceToken = createAsyncThunk('notification/register', async (tokenData, thunkAPI) => {
    try {
        return await notificationService.registerToken(tokenData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to register token");
    }
});

export const markNotificationAsRead = createAsyncThunk('notification/markAsRead', async (notificationId, thunkAPI) => {
    try {
        return await notificationService.markAsRead(notificationId);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to mark as read");
    }
});

const notificationSlice = createSlice({
    name: 'notifications',
    initialState: {
        isRegistered: false,
        isLoading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            // Register Device Token
            .addCase(registerDeviceToken.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerDeviceToken.fulfilled, (state) => {
                state.isLoading = false;
                state.isRegistered = true;
            })
            .addCase(registerDeviceToken.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Mark Notification As Read
            .addCase(markNotificationAsRead.fulfilled, (state, action) => {
                const notification = state.notifications.find(n => n._id === action.payload.data._id);
                if (notification) {
                    notification.isRead = true;
                }
            })
            .addCase(markNotificationAsRead.rejected, (state, action) => {
                state.error = action.payload;
            });
    }
});

export default notificationSlice.reducer;