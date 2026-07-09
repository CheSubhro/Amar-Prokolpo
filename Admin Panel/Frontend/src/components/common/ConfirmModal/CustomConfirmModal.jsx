
import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const CustomConfirmModal = ({ open, onClose, onConfirm, title, message }) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 350, bgcolor: 'background.paper', p: 3, borderRadius: 2 }}>
                
                <Box sx={{ display: 'flex', alignitems: 'center', mb: 2 }}>
                    <WarningAmberIcon color="warning" sx={{ mr: 1 }} />
                    <Typography variant="h6">{title}</Typography>
                </Box>
                
                <Typography mb={3}>{message}</Typography>
                
                <Box sx={{ display: 'flex', justifycontent: 'flex-end', gap: 2 }}>
                    <Button onClick={onClose} color="inherit">Cancel</Button>
                    <Button onClick={onConfirm} variant="contained" color="error">Confirm</Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default CustomConfirmModal;