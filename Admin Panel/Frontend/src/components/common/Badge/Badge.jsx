
import React from 'react';
import { Chip } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledChip = styled(Chip)(({ theme, customStyles }) => ({
    borderRadius: '16px', 
    fontWeight: 600,
    fontSize: '0.75rem', 
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    padding: '4px 10px', 
    '& .MuiChip-label': {
        paddingLeft: '0',
        paddingRight: '0',
    },
    ...customStyles
}));

const Badge = ({ variant, status, children, icon, ...props }) => {
    const rawKey = (variant || status || 'info').toLowerCase();
    const activeKey = rawKey === 'inactive' ? 'warning' : rawKey;

    const colorSchemes = {
        success: { backgroundColor: '#f0fdf4', color: '#15803d', border: '1px solid #bbf7d0' },
        danger: { backgroundColor: '#fef2f2', color: '#b91c1c', border: '1px solid #fecaca' },
        error: { backgroundColor: '#fef2f2', color: '#b91c1c', border: '1px solid #fecaca' },
        warning: { backgroundColor: '#fffbeb', color: '#b45309', border: '1px solid #fde68a' },
        info: { backgroundColor: '#eff6ff', color: '#1d4ed8', border: '1px solid #bfdbfe' },
    };

    const styles = colorSchemes[activeKey] || { backgroundColor: '#f9fafb', color: '#4b5563', border: '1px solid #e5e7eb' };

    return (
        <StyledChip
            icon={icon} 
            label={children}
            customStyles={styles}
            {...props}
        />
    );
};

export default Badge;