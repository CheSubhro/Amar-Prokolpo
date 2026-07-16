
import { Box, Text, Container, Link } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

const Footer = () => {
    return (
        <Box bg="gray.100" py={6} mt="auto">
            <Container maxW="container.xl" textAlign="center">
                <Text mb={2}>© {new Date().getFullYear()} Amar Prokolpo App. All rights reserved.</Text>
                
                {/* Help & Support Link */}
                <Link as={ReactRouterLink} to="/support" color="blue.600" fontWeight="medium">
                    Help & Support
                </Link>
            </Container>
        </Box>
    );
};

export default Footer;