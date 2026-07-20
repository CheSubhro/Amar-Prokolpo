
import React from "react";
import { Box, Heading, Text, Badge, Button, Image, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const SchemeMiniCard = ({ scheme }) => {
    
    const navigate = useNavigate();

    return (
        <Box 
            borderWidth="1px" 
            borderRadius="lg" 
            overflow="hidden" 
            p={4} 
            shadow="sm"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            _hover={{ shadow: "md", borderColor: "blue.300" }}
        >
            <Image 
                src={scheme.image} 
                alt={scheme.title} 
                h="150px" 
                objectFit="cover" 
                borderRadius="md" 
                mb={3} 
            />
            
            <VStack align="start" spacing={2} mb={4}>
                <Badge colorScheme="blue">{scheme.category?.name}</Badge>
                <Heading size="sm" noOfLines={2}>{scheme.title}</Heading>
                <Text fontSize="sm" color="gray.600" noOfLines={3}>
                    {scheme.shortDescription}
                </Text>
            </VStack>

            <Button 
                size="sm" 
                colorScheme="blue" 
                width="full" 
                onClick={() => navigate(`/scheme/${scheme.slug}`)} 
            >
                View Details
            </Button>
        </Box>
    );
};

export default SchemeMiniCard;