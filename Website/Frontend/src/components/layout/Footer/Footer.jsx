
import { Box, Text, Container } from "@chakra-ui/react";

const Footer = () => {
    return (
        <Box bg="gray.100" py={6} mt="auto">
            <Container maxW="container.xl" textAlign="center">
                <Text>© {new Date().getFullYear()} Amar Prokolpo App. All rights reserved.</Text>
            </Container>
        </Box>
    );
};

export default Footer;