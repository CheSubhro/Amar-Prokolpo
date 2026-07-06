
import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const CustomSelect = ({ 
    label, 
    value, 
    onChange, 
    options = [], 
    error, 
    helperText, 
    fullWidth = true, 
    ...props 
}) => {
    return (
        <FormControl fullWidth={fullWidth} error={error} sx={{ my: 1 }}>
            <InputLabel>{label}</InputLabel>
            <Select
                value={value}
                onChange={onChange}
                label={label}
                IconComponent={ArrowDropDownIcon} 
                {...props}
            >
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    );
};

export default CustomSelect;