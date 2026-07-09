
import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const Spinner = ({ size = 40 }) => {
    return (
        <Box display="flex" justifycontent="center" alignitems="center" p={2}>
            <CircularProgress size={size} />
        </Box>
    );
};
export default Spinner;