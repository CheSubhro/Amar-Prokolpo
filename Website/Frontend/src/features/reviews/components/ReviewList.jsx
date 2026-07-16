
import React from "react";
import { useSelector } from "react-redux";
import { useReviews } from "../../../hooks/useReviews";
import { 
    Card, 
    Badge, 
    Spinner, 
    EmptyState 
} from "../../../components/common"; 
import { 
    Box, 
    Heading, 
    SimpleGrid, 
    Text, 
    VStack, 
    Button,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react"; 
import ReviewForm from "./ReviewForm";

const ReviewList = ({ schemeId }) => {

    const { reviews, loading, error } = useReviews(schemeId);
    const { user } = useSelector((state) => state.auth);
    const { isOpen, onOpen, onClose } = useDisclosure();

    if (loading) return <Spinner size="xl" />;
    if (error) return <Text color="red.500">Error: {error}</Text>;

    return (
        <Box py={10} maxW="container.xl" mx="auto">
            {/* Header Section */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={6} px={{ base: 4, md: 0 }}>
                <Heading size="lg">
                    {schemeId ? "User Reviews" : "Recent Success Stories"}
                </Heading>
                
                {user && (
                    <Button colorScheme="blue" onClick={onOpen}>
                        Add Your Review
                    </Button>
                )}
            </Box>

            {/* Empty State */}
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

            {/* Review Modal */}
            <Modal isOpen={isOpen} onClose={onClose} size="md">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Your Success Story</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <ReviewForm schemeId={schemeId} onClose={onClose} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default ReviewList;