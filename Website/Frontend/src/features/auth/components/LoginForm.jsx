
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../authSlice";
import { Box, Button, Input, VStack, Heading, Text } from "@chakra-ui/react";

const LoginForm = ({ onSuccess }) => {

    const [formData, setFormData] = useState({ username: "", password: "" });
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(login(formData));
        if (result.meta.requestStatus === "fulfilled") {
        onSuccess();
        }
    };

    return (
        <Box p={8} maxWidth="400px" borderWidth="1px" borderRadius="lg" boxShadow="lg" bg="white" mx="auto" mt={10}>
            <VStack spacing={4} as="form" onSubmit={handleSubmit}>
                <Heading size="lg">Login</Heading>
                
                <Box w="full">
                <Text mb={1} fontWeight="medium">Username</Text>
                <Input 
                    type="text" 
                    placeholder="Enter username" 
                    onChange={(e) => setFormData({...formData, username: e.target.value})} 
                />
                </Box>

                <Box w="full">
                <Text mb={1} fontWeight="medium">Password</Text>
                <Input 
                    type="password" 
                    placeholder="Enter password" 
                    onChange={(e) => setFormData({...formData, password: e.target.value})} 
                />
                </Box>

                <Button type="submit" colorScheme="blue" width="full" loading={loading}>
                Login
                </Button>
            </VStack>
        </Box>
    );
};

export default LoginForm;