
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { ErrorBoundary } from './components/common';
import AdminLayout from './layouts/AdminLayout';

function App() {
    return (
        <ChakraProvider value={defaultSystem}>
            <Router>
                <ErrorBoundary>
                    <AdminLayout>
                        {/* <Home /> */}
                        <h1>Welcome to CheSubhro's App</h1>
                    </AdminLayout>
                </ErrorBoundary> 
            </Router>
        </ChakraProvider>
    )
}

export default App
