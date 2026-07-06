
import React from 'react';
import { Card as MuiCard, CardContent } from '@mui/material';

const Card = ({ children, ...props }) => {
    return (
        <MuiCard elevation={2} {...props}>
            <CardContent>{children}</CardContent>
        </MuiCard>
    );
};
export default Card;