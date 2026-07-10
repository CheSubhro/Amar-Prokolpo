
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'react-redux';
import { loginSchema } from '../../../utils/validation';
import { loginUser } from '../authSlice';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';

const LoginForm = ({ onLoginSuccess }) => {
    const dispatch = useDispatch();
    const { isLoading, isError, message } = useSelector((state) => state.auth);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = async (data) => {
        const loginData = {
            email: data.identifier.includes('@') ? data.identifier : '',
            username: !data.identifier.includes('@') ? data.identifier : '',
            password: data.password
        };

        const result = await dispatch(loginUser(loginData));
        if (result.type === 'auth/login/fulfilled') {
            onLoginSuccess?.(); // লগইন সফল হলে কলব্যাক
        }
    };

    return (
        <Card className="w-full max-w-md shadow-lg">
            <CardHeader>
                <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <Label>Username or Email</Label>
                        <Input {...register('identifier')} placeholder="Enter username or email" />
                        {errors.identifier && <p className="text-red-500 text-sm mt-1">{errors.identifier.message}</p>}
                    </div>
                    <div>
                        <Label>Password</Label>
                        <Input {...register('password')} type="password" placeholder="••••••••" />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                    </div>
                    {isError && <p className="text-red-600 text-sm text-center">{message}</p>}
                    <Button className="w-full" disabled={isLoading}>
                        {isLoading ? 'Signing in...' : 'Sign In'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default LoginForm;