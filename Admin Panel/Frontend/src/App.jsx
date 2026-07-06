
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ErrorBoundary } from './components/common';
import AppRoutes from './routes/AppRoutes';

function App() {
    return (
        <Router>
            <ErrorBoundary>
                    <AppRoutes />
            </ErrorBoundary> 
        </Router>
    );
}

export default App;