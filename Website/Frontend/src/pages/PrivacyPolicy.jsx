
import React from "react";
import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";

const PrivacyPolicy = () => {
    return (
        <Box py={10} minH="80vh">
            <Container maxW="container.md">
                <VStack spacing={6} align="start">
                    <Heading as="h1" size="xl">Privacy Policy</Heading>
                    <Text color="gray.600">Last updated: July 16, 2026</Text>
                    
                    <Text>
                        Welcome to Amar Prokolpo App. We value your privacy and are committed to protecting your personal information.
                    </Text>

                    <Heading size="md">1. Information We Collect</Heading>
                    <Text>We collect information you provide directly to us, such as when you create an account, submit a support ticket, or update your profile.</Text>

                    <Heading size="md">2. How We Use Your Information</Heading>
                    <Text>We use the collected data to provide, maintain, and improve our services, and to communicate with you regarding your support requests.</Text>

                    <Heading size="md">3. Data Security</Heading>
                    <Text>We take reasonable measures to protect your information from unauthorized access or disclosure.</Text>

                    <Text fontWeight="bold">Contact Us: If you have any questions, please visit our Support page.</Text>
                </VStack>
            </Container>
        </Box>
    );
};

export default PrivacyPolicy;