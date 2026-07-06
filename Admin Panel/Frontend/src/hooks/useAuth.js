
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/auth/authSlice';

export const useAuth = () => {
    const dispatch = useDispatch();
    const { user, isLoading, error } = useSelector((state) => state.auth);

    const login = (userData) => dispatch(loginUser(userData));

    return { user, isLoading, error, login };
};