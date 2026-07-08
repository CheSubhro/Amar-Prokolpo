
import React from 'react';
import ChangePasswordForm  from '../../features/auth/ChangePasswordForm'; 
import { Card } from '../../components/common';
import { useAuth } from '../../hooks/useAuth';

const ChangePasswordPage = () => {
    const { changePassword, isLoading } = useAuth();

    const handlePasswordSubmit = (data) => {
        if (data.newPassword !== data.confirmPassword) return alert("Passwords don't match");
        changePassword({ oldPassword: data.oldPassword, newPassword: data.newPassword });
    };

    return (
        <Card title="Change Password">
            <ChangePasswordForm onSubmit={handlePasswordSubmit} isLoading={isLoading} />
        </Card>
    );
};

export default ChangePasswordPage;