
import React, { useEffect } from "react";
import {
  Box,
  Heading,
  SimpleGrid,
  Spinner,
  Center,
  Text,
} from "@chakra-ui/react";
import useSavedScheme from "../hooks/useSavedScheme";
import SavedSchemeCard from "../features/savedScheme/components/SavedSchemeCard";

const SavedSchemes = () => {

    const { savedSchemes, loading, error, getSavedSchemes } = useSavedScheme();

    useEffect(() => {
        getSavedSchemes();
    }, [getSavedSchemes]);

    if (loading) {
        return (
        <Center h="50vh">
            <Spinner size="xl" color="blue.500" />
        </Center>
        );
    }

    return (
        <Box minH="100vh" bg="gray.50" p={{ base: 4, md: 8 }}>
        <Box maxW="container.xl" mx="auto">
            <Heading mb={8} color="blue.900" size="lg">
            ❤️ Saved Schemes
            </Heading>

            {savedSchemes.length === 0 ? (
            <Center h="30vh">
                <Text color="gray.500" fontSize="lg">
                No saved schemes found.
                </Text>
            </Center>
            ) : (
            <SimpleGrid
                columns={{ base: 1, md: 2, lg: 3 }}
                gap={6}
            >
                {savedSchemes.map((item) => (
                <SavedSchemeCard
                    key={item._id}
                    scheme={item.scheme}
                />
                ))}
            </SimpleGrid>
            )}
        </Box>
        </Box>
    );
};

export default SavedSchemes;