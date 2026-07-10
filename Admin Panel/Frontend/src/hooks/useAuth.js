
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, logoutUser, resetAuth } from '../features/auth/authSlice';

export const useAuth = () => {

    const dispatch = useDispatch();
    const authState = useSelector((state) => state.auth);

    const login = (userData) => dispatch(loginUser(userData));
    const logout = () => dispatch(logoutUser());
    const reset = () => dispatch(resetAuth());
    const fetchUser = () => dispatch(getCurrentUser());

    return {
        ...authState,
        login,
        logout,
        reset,
        fetchUser,
        isAuthenticated: !!authState.user, 
    };
};