
import React from 'react';
import { TextField } from '@mui/material';

const Input = ({ label, variant = "outlined", fullWidth = true, ...props }) => {
    return (
        <TextField 
            label={label} 
            variant={variant} 
            fullWidth={fullWidth} 
            {...props} 
        />
    );
};
export default Input;