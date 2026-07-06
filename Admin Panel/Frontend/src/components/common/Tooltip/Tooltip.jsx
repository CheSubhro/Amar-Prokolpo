
import React from 'react';
import { Tooltip as MuiTooltip } from '@mui/material';

const Tooltip = ({ title, children, ...props }) => {
    return (
        <MuiTooltip title={title} arrow {...props}>
            {children}
        </MuiTooltip>
    );
};
export default Tooltip;