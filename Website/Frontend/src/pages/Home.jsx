

import { useEffect } from "react";
import { Box, Heading, SimpleGrid, Spinner, Text, Center } from "@chakra-ui/react";
import useHome from "../hooks/useHome";
import CategoryCard from "../features/home/components/CategoryCard";

const Home = () => {

    const { categories, loading, error, getCategories } = useHome();

    useEffect(() => {
        getCategories();
    }, []);

    if (loading) {
        return (
            <Center h="50vh">
                <Spinner size="xl" color="blue.500" />
            </Center>
        );
    }

    return (
        <Box p={6}>
            <Heading size="lg" mb={6}>Dashboard</Heading>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
                {categories.map((category) => (
                <CategoryCard 
                    key={category._id} 
                    category={category} 
                />
                ))}
            </SimpleGrid>
        </Box>
    );
};

export default Home;