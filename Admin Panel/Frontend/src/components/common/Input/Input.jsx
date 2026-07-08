
import React from 'react';
import { TextField } from '@mui/material';

const Input = ({ label, variant = "outlined", fullWidth = true, slotProps, ...props }) => {
    return (
        <TextField 
            label={label} 
            variant={variant} 
            fullWidth={fullWidth}
            slotProps={slotProps} 
            {...props} 
        />
    );
};

export default Input;