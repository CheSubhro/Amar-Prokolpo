
import React,{useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ErrorBoundary } from './components/common';
import AppRoutes from './routes/AppRoutes';
import { useAuth } from './hooks/useAuth';

function App() {

    const { checkAuth } = useAuth();
    useEffect(() => {
        checkAuth(); 
    }, []);
    return (
        <Router>
            <ErrorBoundary>
                    <AppRoutes />
            </ErrorBoundary> 
        </Router>
    );
}

export default App;