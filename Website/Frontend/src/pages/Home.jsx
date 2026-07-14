
import { useEffect } from "react";
import { Box, Heading, SimpleGrid, Spinner, Center } from "@chakra-ui/react";
import useHome from "../hooks/useHome";
import CategoryCard from "../features/home/components/CategoryCard";
import Hero from "../features/home/components/Hero"; 

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
        <Box minH="100vh" bg="gray.50">
            {/* Hero Section */}
            <Hero />

            {/* Dashboard Content */}
            <Box p={6} maxW="container.xl" mx="auto">
                <Heading size="lg" mb={6}>Browse by Category</Heading>

                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
                    {categories.map((category) => (
                        <CategoryCard 
                            key={category._id} 
                            category={category} 
                        />
                    ))}
                </SimpleGrid>
            </Box>
        </Box>
    );
};

export default Home;