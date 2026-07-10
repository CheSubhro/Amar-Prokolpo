
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { loginSchema } from '../../../utils/validation';
import { useAuth } from '../../../hooks/useAuth'; 
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';

const LoginForm = ({ onLoginSuccess }) => {

    const [showPassword, setShowPassword] = useState(false);
    
    const { login, isLoading, isError, message } = useAuth();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = async (data) => {
        const loginData = {
            email: data.identifier.includes('@') ? data.identifier : '',
            username: !data.identifier.includes('@') ? data.identifier : '',
            password: data.password
        };

        const result = await login(loginData);
        
        if (result?.meta?.requestStatus === 'fulfilled') {
            onLoginSuccess?.();
        }
    };

    return (
        <Card className="w-full max-w-md shadow-lg">
            <CardHeader>
                <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Identifier Field */}
                    <div>
                        <Label>Username or Email</Label>
                        <Input {...register('identifier')} placeholder="Enter username or email" />
                        {errors.identifier && <p className="text-red-500 text-sm mt-1">{errors.identifier.message}</p>}
                    </div>

                    {/* Password Field with Eye Icon */}
                    <div className="relative">
                        <Label>Password</Label>
                        <Input 
                            {...register('password')} 
                            type={showPassword ? "text" : "password"} 
                            placeholder="••••••••" 
                            className="pr-10"
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            onClick={() => setShowPassword(!showPassword)} 
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
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