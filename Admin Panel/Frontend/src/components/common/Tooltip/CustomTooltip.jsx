
import React from 'react';
import { Tooltip as MuiTooltip } from '@mui/material';

const CustomTooltip = ({ title, children, ...props }) => {
    return (
        <MuiTooltip title={title} arrow {...props}>
            {children}
        </MuiTooltip>
    );
};
export default CustomTooltip;