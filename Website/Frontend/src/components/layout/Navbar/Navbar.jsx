
import React from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Container,
  HStack,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {
    return (
        <Box
            borderBottom="1px solid"
            borderColor="gray.200"
            py={4}
            bg="white"
            position="sticky"
            top={0}
            zIndex={1000}
        >
            <Container maxW="container.xl">
                <Flex justify="space-between" align="center">
                {/* Logo */}
                <Text
                    as={RouterLink}
                    to="/"
                    fontSize="xl"
                    fontWeight="bold"
                    color="blue.700"
                >
                    Amar Prokolpo
                </Text>

                {/* Navigation Links */}
                <HStack spacing={8} display={{ base: "none", md: "flex" }}>
                    {[
                    { name: "Home", path: "/" },
                    { name: "Categories", path: "/categories" },
                    { name: "Top Viewed", path: "/top-viewed" },
                    { name: "❤️ Saved Schemes", path: "/saved-schemes" },
                    ].map((link) => (
                    <ChakraLink
                        key={link.path}
                        as={RouterLink}
                        to={link.path}
                        fontWeight="medium"
                        _hover={{ textDecoration: "none", color: "blue.500" }}
                    >
                        {link.name}
                    </ChakraLink>
                    ))}

                    <Button size="sm" colorScheme="blue" variant="solid">
                    Login
                    </Button>
                </HStack>
                </Flex>
            </Container>
        </Box>
    );
};

export default Navbar;