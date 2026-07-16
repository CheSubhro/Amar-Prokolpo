
import React from "react";
import { Box, Container, Heading, Text } from "@chakra-ui/react";
import SupportForm from "../features/support/components/SupportForm";

const SupportPage = () => {
    return (
        <Box py={10} minH="80vh">
            <Container maxW="container.md">
                <Box textAlign="center" mb={10}>
                    <Heading as="h1" size="xl" mb={4}>
                        Need Help?
                    </Heading>
                    <Text color="gray.600" fontSize="lg">
                        Submit a support ticket and our team will get back to you as soon as possible.
                    </Text>
                </Box>

                <SupportForm />
            </Container>
        </Box>
    );
};

export default SupportPage;