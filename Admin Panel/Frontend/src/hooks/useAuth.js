
import { useDispatch, useSelector } from 'react-redux';
import { 
    loginUser,
    getCurrentUser, 
    logoutUser, 
    changePassword 
} from '../features/auth/authSlice'; 

export const useAuth = () => {

    const dispatch = useDispatch();
    const { user, isLoading, error, isAuthenticated, isInitialLoading } = useSelector((state) => state.auth);

    const login = (userData) => dispatch(loginUser(userData));

    const checkAuth = () => dispatch(getCurrentUser());

    const logout = () => dispatch(logoutUser());

    const updatePassword = (passwords) => dispatch(changePassword(passwords));

    return { 
        user, 
        isLoading, 
        error, 
        login, 
        isAuthenticated, 
        isInitialLoading, 
        checkAuth,
        logout,
        changePassword: updatePassword 
    };
};