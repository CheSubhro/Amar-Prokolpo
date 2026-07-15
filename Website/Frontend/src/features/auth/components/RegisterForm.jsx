
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../authSlice";
import { Box, Button, Input, VStack, Heading, Text } from "@chakra-ui/react";

const RegisterForm = ({ onSuccess }) => {
    const [formData, setFormData] = useState({ 
        fullName: "", 
        email: "", 
        username: "", 
        password: "", 
        avatar: null,
        coverImage: null 
    });
    
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.auth);

    const handleSubmit = async (e) => {

        e.preventDefault();
        const data = new FormData();
        
        data.append("fullName", formData.fullName);
        data.append("email", formData.email);
        data.append("username", formData.username);
        data.append("password", formData.password);
        data.append("role", "user"); 

        if (formData.avatar) {
            data.append("avatar", formData.avatar);
        }
        if (formData.coverImage) {
            data.append("coverImage", formData.coverImage);
        }
        
        const result = await dispatch(register(data));
        if (result.meta.requestStatus === "fulfilled") onSuccess();
    };

    return (
        <Box p={8} maxWidth="400px" borderWidth="1px" borderRadius="lg" mx="auto" mt={10}>
            <VStack spacing={4} as="form" onSubmit={handleSubmit}>
                <Heading size="lg">Register</Heading>
                
                <Input placeholder="Full Name" required onChange={(e) => setFormData({...formData, fullName: e.target.value})} />
                <Input placeholder="Email" type="email" required onChange={(e) => setFormData({...formData, email: e.target.value})} />
                <Input placeholder="Username" required onChange={(e) => setFormData({...formData, username: e.target.value})} />
                <Input type="password" placeholder="Password" required onChange={(e) => setFormData({...formData, password: e.target.value})} />
                
                <Box width="full">
                    <Text fontSize="sm">Avatar (Optional)</Text>
                    <Input type="file" onChange={(e) => setFormData({...formData, avatar: e.target.files[0]})} />
                </Box>
                
                <Box width="full">
                    <Text fontSize="sm">Cover Image (Optional)</Text>
                    <Input type="file" onChange={(e) => setFormData({...formData, coverImage: e.target.files[0]})} />
                </Box>

                <Button type="submit" width="full" isLoading={loading}>Register</Button>
            </VStack>
        </Box>
    );
};

export default RegisterForm;