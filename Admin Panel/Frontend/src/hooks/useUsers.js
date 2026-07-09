
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { getAllUsers, getUserProfile, updateUserDetails } from '../features/users/userSlice';

export const useUsers = () => {

    const dispatch = useDispatch();
    const { users, selectedUser, isLoading, error } = useSelector((state) => state.users);

    const fetchAllUsers = useCallback(() => {
        dispatch(getAllUsers());
    }, [dispatch]);
    
    const fetchUserProfile = useCallback((username) => {
        dispatch(getUserProfile(username));
    }, [dispatch]);
    
    const updateUser = useCallback((data) => {
        dispatch(updateUserDetails(data));
    }, [dispatch]);

    return {
        users,
        selectedUser,
        isLoading,
        error,
        fetchAllUsers,
        fetchUserProfile,
        updateUser
    };
};