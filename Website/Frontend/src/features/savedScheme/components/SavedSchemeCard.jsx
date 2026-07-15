
import React from "react";
import {
  Box,
  Image,
  Heading,
  Text,
  Button,
  VStack,
  Badge,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { IconArrowRight } from "@tabler/icons-react";

const SavedSchemeCard = ({ scheme }) => {

  if (!scheme) return null;

    return (
        <Box
        bg="white"
        borderRadius="2xl"
        overflow="hidden"
        shadow="sm"
        border="1px solid"
        borderColor="gray.200"
        transition="all 0.3s ease"
        _hover={{
            transform: "translateY(-5px)",
            shadow: "md",
        }}
        >
        {scheme.image && (
            <Image
            src={scheme.image}
            alt={scheme.title}
            h="200px"
            w="100%"
            objectFit="cover"
            />
        )}

        <VStack align="start" p={5} spacing={3}>
            <Badge colorScheme="blue" borderRadius="md" px={2}>
            {scheme.category?.name || "General"}
            </Badge>

            <Heading size="md" noOfLines={2}>
            {scheme.title}
            </Heading>

            <Text color="gray.600" fontSize="sm" noOfLines={3} flexGrow={1}>
            {scheme.shortDescription}
            </Text>

            <Button
            as={RouterLink}
            to={`/schemes/${scheme.slug}`}
            size="sm"
            variant="outline"
            colorScheme="blue"
            rightIcon={<IconArrowRight size={16} />}
            mt={2}
            >
            View Details
            </Button>
        </VStack>
        </Box>
    );
};

export default SavedSchemeCard;