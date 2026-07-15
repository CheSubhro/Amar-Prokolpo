
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../authSlice";
import { Box, Button, Input, VStack, Heading, Text } from "@chakra-ui/react";

const RegisterForm = ({ onSuccess }) => {

    const [formData, setFormData] = useState({ fullName: "", email: "", username: "", password: "", avatar: null });
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.auth);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => data.append(key, value));
        
        const result = await dispatch(register(data));
        if (result.meta.requestStatus === "fulfilled") onSuccess();
    };

    return (
        <Box p={8} maxWidth="400px" borderWidth="1px" borderRadius="lg" mx="auto" mt={10}>
            <VStack spacing={4} as="form" onSubmit={handleSubmit}>
                <Heading size="lg">Register</Heading>
                <Input placeholder="Full Name" onChange={(e) => setFormData({...formData, fullName: e.target.value})} />
                <Input placeholder="Email" onChange={(e) => setFormData({...formData, email: e.target.value})} />
                <Input placeholder="Username" onChange={(e) => setFormData({...formData, username: e.target.value})} />
                <Input type="password" placeholder="Password" onChange={(e) => setFormData({...formData, password: e.target.value})} />
                <Input type="file" onChange={(e) => setFormData({...formData, avatar: e.target.files[0]})} />
                <Button type="submit" width="full" loading={loading}>Register</Button>
            </VStack>
        </Box>
    );
};
export default RegisterForm;