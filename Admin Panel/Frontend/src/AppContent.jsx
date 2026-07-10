
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom'; 
import AppRoutes from './routes/AppRoutes';
import { getCurrentUser } from './features/auth/authSlice';

const AppContent = () => {

    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname !== '/login') {
            dispatch(getCurrentUser());
        }
    }, [dispatch, location.pathname]);

    return <AppRoutes />;
};

export default AppContent;