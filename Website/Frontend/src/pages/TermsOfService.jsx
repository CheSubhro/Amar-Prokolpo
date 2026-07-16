
import React from "react";
import { Box, Container, Heading, Text, VStack, List } from "@chakra-ui/react";

const TermsOfService = () => {
    return (
        <Box py={10} minH="80vh">
            <Container maxW="container.md">
                <VStack spacing={6} align="start">
                    <Heading as="h1" size="xl">Terms of Service</Heading>
                    <Text color="gray.600">Last updated: July 16, 2026</Text>
                    
                    <Text>
                        By using Amar Prokolpo App, you agree to comply with and be bound by the following terms and conditions.
                    </Text>

                    <Heading size="md">1. Acceptance of Terms</Heading>
                    <Text>By accessing this website, you are agreeing to be bound by these terms of service and all applicable laws.</Text>

                    <Heading size="md">2. Use License</Heading>
                    <Text>Permission is granted to use the materials on Amar Prokolpo for personal, non-commercial use only.</Text>

                    <Heading size="md">3. User Responsibilities</Heading>
                    <List.Root spacing={3}>
                        <List.Item>You must provide accurate information.</List.Item>
                        <List.Item>You are responsible for your account security.</List.Item>
                        <List.Item>Do not misuse the platform or its services.</List.Item>
                    </List.Root>

                    <Heading size="md">4. Limitation of Liability</Heading>
                    <Text>Amar Prokolpo shall not be held liable for any damages arising from the use or inability to use the materials on this site.</Text>
                </VStack>
            </Container>
        </Box>
    );
};

export default TermsOfService;