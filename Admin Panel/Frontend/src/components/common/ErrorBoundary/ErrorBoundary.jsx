
import React, { Component } from 'react';
import { Box, Typography, Button } from '@mui/material';
// import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

class ErrorBoundary extends Component {
    state = { hasError: false };
    static getDerivedStateFromError(error) { return { hasError: true }; }
    
    render() {
        if (this.state.hasError) {
            return (
                <Box textAlign="center" p={5}>
                    {/* <ErrorOutlineIcon color="error" sx={{ fontSize: 60 }} /> */}
                    <Typography variant="h6">Something went wrong!</Typography>
                    <Button onClick={() => window.location.reload()}>Reload</Button>
                </Box>
            );
        }
        return this.props.children;
    }
}
export default ErrorBoundary;