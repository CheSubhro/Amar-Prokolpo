
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers } from '../features/user/userSlice';

export const useUser = () => {

    const dispatch = useDispatch();
    const { items, isLoading } = useSelector((state) => state.user);
    
    const getUsers = () => dispatch(fetchAllUsers());
    
    return { users: items, loading: isLoading, getUsers };
};