
import React from "react";
import {
  Box,
  SimpleGrid,
  Heading,
  Container,
  Text,
  Center
} from "@chakra-ui/react";
import SchemeCard from "./SchemeCard";

const FeaturedSchemes = ({ schemes }) => {
    return (
        <Box as="section" py={{ base: 12, md: 16 }} bg="gray.50">
            <Container maxW="container.xl">
                {/* Section Header */}
                <Box mb={10} textAlign={{ base: "center", md: "left" }}>
                <Heading size="lg" color="blue.900" mb={2}>
                    Featured Government Schemes
                </Heading>
                <Text color="gray.600">
                    Explore our hand-picked selection of high-priority government initiatives.
                </Text>
                </Box>

                {/* Schemes Grid */}
                {schemes && schemes.length > 0 ? (
                <SimpleGrid
                    columns={{ base: 1, md: 2, lg: 3 }}
                    gap={8}
                >
                    {schemes.map((scheme) => (
                    <SchemeCard 
                        key={scheme._id} 
                        scheme={scheme} 
                    />
                    ))}
                </SimpleGrid>
                ) : (
                <Center py={10}>
                    <Text color="gray.500">No featured schemes available at the moment.</Text>
                </Center>
                )}
            </Container>
        </Box>
    );
};

export default FeaturedSchemes;