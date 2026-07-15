
import { useReviews } from "../../../hooks/useReviews";
import { 
    Card, 
    Badge, 
    Spinner, 
    EmptyState 
} from "../../../components/common"; 
import { Box, Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react"; 

const ReviewList = ({ schemeId }) => {
    const { reviews, loading, error } = useReviews(schemeId);

    if (loading) return <Spinner size="xl" />;
    if (error) return <Text color="red.500">Error: {error}</Text>;
    if (reviews.length === 0) return <EmptyState message="No success stories found yet." />;

    return (
        <Box py={10} maxW="container.xl" mx="auto">
            <Heading size="lg" mb={6} textAlign="center">
                {schemeId ? "User Reviews" : "Recent Success Stories"}
            </Heading>
            
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                {reviews.map((rev) => (
                    <Card key={rev._id} p={4} shadow="md" _hover={{ shadow: "lg" }} transition="0.3s">
                        <VStack align="start" spacing={3}>
                            <Text fontWeight="bold" fontSize="md">{rev.userId?.fullName}</Text>
                            <Text fontSize="sm" color="gray.600" noOfLines={3}>"{rev.comment}"</Text>
                            
                            {!schemeId && (
                                <Badge variant="subtle" colorScheme="blue">
                                    {rev.schemeId?.title}
                                </Badge>
                            )}
                            
                            <Text fontWeight="semibold" color="yellow.500">Rating: {rev.rating}/5</Text>
                        </VStack>
                    </Card>
                ))}
            </SimpleGrid>
        </Box>
    );
};

export default ReviewList;