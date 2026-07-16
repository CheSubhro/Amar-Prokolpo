
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useReviews } from "../../../hooks/useReviews";
import { 
    Card, 
    Badge, 
    Spinner, 
    EmptyState,
    Modal 
} from "../../../components/common"; 
import { 
    Box, 
    Heading, 
    SimpleGrid, 
    Text, 
    VStack, 
} from "@chakra-ui/react"; 
import ReviewForm from "./ReviewForm";

const ReviewList = ({ schemeId }) => {

    const { reviews, loading, error } = useReviews(schemeId);
    const { user } = useSelector((state) => state.auth);
    const [isOpen, setIsOpen] = useState(false);
    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);

    if (loading) return <Spinner size="xl" />;
    if (error) return <Text color="red.500">Error: {error}</Text>;

    return (
        
        <Box py={10} maxW="container.xl" mx="auto">
            {/* Header Section */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={6} px={{ base: 4, md: 0 }}>
                <Heading size="lg">
                    {schemeId ? "User Reviews" : "Recent Success Stories"}
                </Heading>
            </Box>

            {/* Empty State / Reviews List */}
            {reviews.length === 0 ? (
                <EmptyState message="No success stories found yet." />
            ) : (
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} px={{ base: 4, md: 0 }}>
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
            )}
            
            {/* Custom Review Modal */}
            {isOpen && (
                <Modal
                isOpen={isOpen}
                onClose={onClose}
                title="Add Your Success Story"
            >
                <ReviewForm
                    schemeId={schemeId}
                    onClose={onClose}
                />
            </Modal>
            )}
        </Box>
    );
};

export default ReviewList;