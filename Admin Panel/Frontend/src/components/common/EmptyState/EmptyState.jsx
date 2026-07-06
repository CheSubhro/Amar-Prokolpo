
import React from 'react';
import { Box, Typography } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';

const EmptyState = ({ message = "No data available" }) => {
    return (
        <Box display="flex" flexDirection="column" alignItems="center" p={4}>
            <InboxIcon sx={{ fontSize: 50, color: 'text.secondary', mb: 1 }} />
            <Typography color="text.secondary">{message}</Typography>
        </Box>
    );
};
export default EmptyState;