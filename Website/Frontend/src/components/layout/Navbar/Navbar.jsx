
import React from "react";
import { Box, Flex, Text, Button, Container, HStack, Avatar } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../features/auth/authSlice";

const Navbar = () => {

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
    };

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
                    <Text
                        as={RouterLink}
                        to="/"
                        fontSize="xl"
                        fontWeight="bold"
                        color="blue.700"
                    >
                        Amar Prokolpo
                    </Text>

                    <HStack spacing={6}>
                        <Text as={RouterLink} to="/" cursor="pointer">Home</Text>
                        <Text as={RouterLink} to="/saved-schemes" cursor="pointer">❤️ Saved Schemes</Text>
                        <Text as={RouterLink} to="/wishlist" cursor="pointer">📋 Wishlist</Text>
                        <Text as={RouterLink} to="/support" cursor="pointer">Support</Text>

                        {user ? (
                            <HStack>
                                <Avatar.Root size="sm">
                                    <Avatar.Fallback name={user.fullName} />
                                    <Avatar.Image src={user.avatar} />
                                </Avatar.Root>

                                <Text fontSize="sm">{user.fullName}</Text>
                                
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </Button>
                            </HStack>
                        ) : (
                            <Button
                                as={RouterLink}
                                to="/login"
                                size="sm"
                                colorScheme="blue"
                            >
                                Login
                            </Button>
                        )}
                    </HStack>
                </Flex>
            </Container>
        </Box>
    );
};

export default Navbar;