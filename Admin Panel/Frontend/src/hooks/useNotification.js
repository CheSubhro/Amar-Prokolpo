
import { useDispatch, useSelector } from "react-redux";
import {
    fetchNotifications,
    readNotification
} from "../features/notification/notificationSlice";

export const useNotification = () => {
    
    const dispatch = useDispatch();
    
    const { notifications, loading, error } = useSelector(
        (state) => state.notification
    );

    const getNotifications = () => {
        dispatch(fetchNotifications());
    };

    const markRead = (id) => {
        dispatch(readNotification(id));
    };

    return {
        notifications,
        loading,
        error,
        getNotifications,
        markRead
    };
};