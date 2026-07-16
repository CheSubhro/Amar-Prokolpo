
import React from "react";
import { Box, Heading, Text, Button, VStack } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const NotFound = () => {
    return (
        <Box py={20} textAlign="center" minH="80vh">
            <VStack spacing={4}>
                <Heading size="2xl" color="blue.600">404</Heading>
                <Heading size="lg">Page Not Found</Heading>
                <Text color="gray.600">
                    The page you are looking for does not exist or has been moved.
                </Text>
                <Button as={RouterLink} to="/" colorScheme="blue" mt={4}>
                    Go Back Home
                </Button>
            </VStack>
        </Box>
    );
};

export default NotFound;