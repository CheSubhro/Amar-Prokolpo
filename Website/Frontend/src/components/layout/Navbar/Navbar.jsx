
import { Box, Flex, Text, Button, Container } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <Box borderBottom="1px solid" borderColor="gray.200" py={4}>
        <Container maxW="container.xl">
            <Flex justify="space-between" align="center">
            <Text fontSize="xl" fontWeight="bold">Amar Prokolpo</Text>
            <Flex gap={4}>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Button size="sm" colorScheme="blue">Login</Button>
            </Flex>
            </Flex>
        </Container>
        </Box>
    );
};

export default Navbar;