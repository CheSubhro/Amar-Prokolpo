
import { useNavigate } from "react-router-dom";
import { Box, Image, Heading, Text, VStack } from "@chakra-ui/react";

const CategoryCard = ({ category }) => {

    const navigate = useNavigate();

    return (
        <Box 
            borderWidth="1px" 
            borderRadius="lg" 
            p={5} 
            shadow="md" 
            bg="white"
            transition="transform 0.2s"
            _hover={{ transform: "scale(1.05)", shadow: "lg" }}
            cursor="pointer"
            onClick={() => navigate(`/category/${category._id}`)}
        >
        <VStack align="start" gap={3}>
            {category.icon && (
            <Image
                src={category.icon}
                alt={category.name}
                boxSize="50px"
                objectFit="cover"
            />
            )}
            
            <Box>
            <Heading size="md">{category.name}</Heading>
            <Text color="gray.600" mt={2} fontSize="sm">
                {category.description}
            </Text>
            </Box>
        </VStack>
        </Box>
    );
};

export default CategoryCard;