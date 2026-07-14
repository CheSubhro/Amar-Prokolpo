
import React from "react";
import {
  Box,
  SimpleGrid,
  Heading,
  Container,
  Text,
  Center,
} from "@chakra-ui/react";
import SchemeCard from "./SchemeCard";

const TopViewedSchemes = ({ schemes }) => {
    return (
        <Box as="section" py={{ base: 12, md: 16 }} bg="white">
            <Container maxW="container.xl">
                {/* Section Header */}
                <Box mb={10} textAlign={{ base: "center", md: "left" }}>
                <Heading size="lg" color="blue.900" mb={3}>
                    Popular Government Schemes
                </Heading>
                <Text color="gray.600" fontSize={{ base: "md", md: "lg" }}>
                    The most viewed and trending initiatives by our users
                </Text>
                </Box>

                {/* Content */}
                {schemes && schemes.length > 0 ? (
                <SimpleGrid
                    columns={{ base: 1, md: 2, lg: 3 }}
                    spacing={{ base: 6, md: 8 }}
                >
                    {schemes.map((scheme) => (
                    <SchemeCard key={scheme._id} scheme={scheme} />
                    ))}
                </SimpleGrid>
                ) : (
                <Center py={10}>
                    <Text color="gray.500" fontSize="lg">
                    No popular schemes available at the moment.
                    </Text>
                </Center>
                )}
            </Container>
        </Box>
    );
};

export default TopViewedSchemes;