
import React from 'react';
import { Pagination as MuiPagination, Stack } from '@mui/material';

const Pagination = ({ count, page, onChange, ...props }) => {
    return (
        <Stack spacing={2} alignItems="center" my={2}>
            <MuiPagination 
                count={count} 
                page={page} 
                onChange={onChange} 
                color="primary" 
                {...props} 
            />
        </Stack>
    );
};
export default Pagination;