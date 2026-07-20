
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, SimpleGrid, Heading, Spinner, Center, Text, Container } from "@chakra-ui/react";
import useScheme from "../hooks/useScheme"; 
import SchemeMiniCard from "../features/scheme/components/SchemeMiniCard";

const CategorySchemes = () => {

    const { categoryId } = useParams();
    
    const { 
        schemes, 
        loading, 
        error,
        getSchemesByCategory,
        resetScheme 
    } = useScheme();

    useEffect(() => {
        resetScheme(); 
        getSchemesByCategory(categoryId);
    }, [categoryId]);

    if (loading) {
        return (
            <Center h="60vh">
                <Spinner size="xl" color="blue.500" thickness="4px" />
            </Center>
        );
    }

    if (error) {
        return (
            <Center h="60vh">
                <Text color="red.500">Error: {error}</Text>
            </Center>
        );
    }

    return (
        <Container maxW="container.xl" py={10}>
            <Heading mb={8} textAlign="center">Schemes in this Category</Heading>
            
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
                {Array.isArray(schemes) && schemes.length > 0 ? (
                    schemes.map((scheme) => (
                        <SchemeMiniCard key={scheme._id} scheme={scheme} />
                    ))
                ) : (
                    <Text textAlign="center" gridColumn="1/-1" color="gray.500">
                        No schemes found in this category.
                    </Text>
                )}
            </SimpleGrid>
        </Container>
    );
};

export default CategorySchemes;