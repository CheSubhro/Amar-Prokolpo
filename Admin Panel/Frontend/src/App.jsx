
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ErrorBoundary } from './components/common';
import AdminLayout from './layouts/AdminLayout';

function App() {
    return (
        <Router>
            <ErrorBoundary>
                <AdminLayout>
                    <h1>Welcome to CheSubhro's App</h1>
                </AdminLayout>
            </ErrorBoundary> 
        </Router>
    );
}

export default App;