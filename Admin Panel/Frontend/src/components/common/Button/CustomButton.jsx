
import React from 'react';
import { Button } from '@mui/material';

const CustomButton = ({ children, startIcon, endIcon, variant = "contained", ...props }) => {
    return (
        <Button 
            variant={variant} 
            startIcon={startIcon} 
            endIcon={endIcon} 
            {...props}
        >
            {children}
        </Button>
    );
};
export default CustomButton;