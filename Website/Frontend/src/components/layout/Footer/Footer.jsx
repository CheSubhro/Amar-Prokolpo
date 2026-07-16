
import { Box, Container, SimpleGrid, Text, Link, VStack, HStack, Icon } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope } from "react-icons/fa";

const Footer = () => {
    return (
        <Box bg="gray.900" color="white" py={10} mt="auto">
            <Container maxW="container.xl">
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} textAlign={{ base: "center", md: "left" }}>
                    
                    <VStack align={{ base: "center", md: "start" }} spacing={3}>
                        <Text fontSize="xl" fontWeight="bold">Amar Prokolpo</Text>
                        <Text fontSize="sm" color="gray.400">
                            Simplifying your project management and support needs.
                        </Text>
                    </VStack>

                    <VStack align={{ base: "center", md: "start" }}>
                        <Text fontWeight="bold" mb={2}>Quick Links</Text>
                        <Link as={ReactRouterLink} to="/support" color="gray.300" _hover={{ color: "white" }}>
                            Help & Support
                        </Link>
                        <Link as={ReactRouterLink} to="/privacy-policy" color="gray.300" _hover={{ color: "white" }}>
                            Privacy Policy
                        </Link>
                        <Link as={ReactRouterLink} to="/terms-of-service" color="gray.300" _hover={{ color: "white" }}>
                            Terms of Service
                        </Link>
                    </VStack>

                    <VStack align={{ base: "center", md: "start" }}>
                        <Text fontWeight="bold" mb={2}>Follow Us</Text>
                        <HStack spacing={4}>
                            <Link href="https://www.facebook.com" isExternal>
                                <Icon as={FaFacebook} w={6} h={6} />
                            </Link>

                            <Link href="https://twitter.com" isExternal>
                                <Icon as={FaTwitter} w={6} h={6} />
                            </Link>

                            <Link href="https://www.instagram.com" isExternal>
                                <Icon as={FaInstagram} w={6} h={6} />
                            </Link>
                        </HStack>
                    </VStack>
                </SimpleGrid>

                <Text textAlign="center" fontSize="sm" color="gray.500" mt={10} pt={6} borderTop="1px solid #333">
                    © {new Date().getFullYear()} Amar Prokolpo App. All rights reserved.
                </Text>
            </Container>
        </Box>
    );
};

export default Footer;