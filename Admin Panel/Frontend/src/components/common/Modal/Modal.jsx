
import React from 'react';
import { Modal, Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const style = {
    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
    width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 2
};

const Modal = ({ open, onClose, title, children }) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6">{title}</Typography>
                    <IconButton onClick={onClose}><CloseIcon /></IconButton>
                </Box>
                {children}
            </Box>
        </Modal>
    );
};
export default Modal;