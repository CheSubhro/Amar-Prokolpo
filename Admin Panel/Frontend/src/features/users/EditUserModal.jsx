
import React from 'react';
import { Modal } from '../../components/common';
import EditUserForm from './EditUserForm';

const EditUserModal = ({ open, onClose, user, onUpdate }) => {
    return (
        <Modal 
            open={open} 
            onClose={onClose} 
            title="Edit User"
        >
            <EditUserForm user={user} onUpdate={onUpdate} onClose={onClose} />
        </Modal>
    );
};

export default EditUserModal;