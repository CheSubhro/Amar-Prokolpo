
import React, { useState } from 'react';
import { Box, Typography, Paper, TextField, Button, Grid, MenuItem } from '@mui/material';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';

const RegisterForm = ({ onRegister }) => {
    const [files, setFiles] = useState({ avatar: null, coverImage: null });
    const [formData, setFormData] = useState({
        username: '', email: '', fullName: '', password: '', role: 'admin'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        if (files.avatar) data.append("avatar", files.avatar);
        if (files.coverImage) data.append("coverImage", files.coverImage);
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        onRegister(data);
    };

    return (
        // maxWidth বাড়িয়েছি যাতে ফর্মটি চওড়া হয়
        <Paper elevation={3} sx={{ maxWidth: 800, mx: 'auto', mt: 5, p: 5, borderRadius: 3 }}>
            <Box sx={{ mb: 4, textAlign: 'center', color: 'primary.main' }}>
                <PersonAddOutlinedIcon sx={{ fontSize: 50 }} />
                <Typography variant="h4" fontWeight="700" sx={{ mt: 1, color: 'text.primary' }}>Admin Registration</Typography>
                <Typography variant="body1" color="text.secondary">Create a new admin account</Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit}>
                {/* Grid ব্যবহার করে দুই কলামে ভাগ করা হয়েছে */}
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <TextField fullWidth label="Username" onChange={(e) => setFormData({...formData, username: e.target.value})} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField fullWidth label="Full Name" onChange={(e) => setFormData({...formData, fullName: e.target.value})} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField fullWidth label="Email" onChange={(e) => setFormData({...formData, email: e.target.value})} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField fullWidth label="Password" type="password" onChange={(e) => setFormData({...formData, password: e.target.value})} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            select
                            fullWidth
                            label="Select Role"
                            value={formData.role}
                            onChange={(e) => setFormData({...formData, role: e.target.value})}
                        >
                            <MenuItem value="user">User</MenuItem>
                            <MenuItem value="admin">Admin</MenuItem>
                            <MenuItem value="moderator">Moderator</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Button component="label" fullWidth variant="outlined" sx={{ py: 1.5 }}>
                            {files.avatar ? files.avatar.name : "UPLOAD AVATAR"}
                            <input type="file" hidden onChange={(e) => setFiles({...files, avatar: e.target.files[0]})} />
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Button component="label" fullWidth variant="outlined" sx={{ py: 1.5 }}>
                            {files.coverImage ? files.coverImage.name : "UPLOAD COVER IMAGE"}
                            <input type="file" hidden onChange={(e) => setFiles({...files, coverImage: e.target.files[0]})} />
                        </Button>
                    </Grid>
                </Grid>

                <Button type="submit" fullWidth variant="contained" size="large" sx={{ py: 2, mt: 4, fontWeight: 'bold', fontSize: '1.1rem' }}>
                    REGISTER
                </Button>
            </Box>
        </Paper>
    );
};

export default RegisterForm;