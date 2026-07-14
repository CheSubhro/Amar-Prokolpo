
import React from "react";
import {
  Box,
  Image,
  Heading,
  Text,
  Badge,
  Button,
  VStack,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { IconArrowRight } from "@tabler/icons-react";

const SchemeCard = ({ scheme }) => {

    const truncateText = (text, limit = 50) => {
        if (!text) return "";
        return text.length > limit
            ? text.substring(0, limit) + "..."
            : text;
    };

    return (
        <Box
            bg="white"
            borderRadius="2xl"
            overflow="hidden"
            border="1px solid"
            borderColor="gray.100"
            shadow="sm"
            transition="all 0.3s ease"
            _hover={{
                transform: "translateY(-8px)",
                shadow: "lg",
                borderColor: "blue.100",
            }}
        >
        {/* Image */}
        {scheme.image && (
            <Image
            src={scheme.image}
            alt={scheme.title}
            width="100%"
            height="200px"
            objectFit="cover"
            />
        )}

        <VStack align="start" spacing={4} p={6}>
            {/* Category Badge */}
            {scheme.category?.name && (
            <Badge
                colorScheme="blue"
                variant="subtle"
                borderRadius="full"
                px={3}
                py={0.5}
                textTransform="uppercase"
                fontSize="xs"
                letterSpacing="wider"
            >
                {scheme.category.name}
            </Badge>
            )}

            {/* Title */}
            <Heading size="md" color="blue.900" noOfLines={2} lineHeight="1.4">
            {scheme.title}
            </Heading>

            {/* Description */}
            <Text color="gray.600" fontSize="sm" lineHeight="tall">
                {truncateText(scheme.shortDescription, 50)}
            </Text>

            {/* Action Button */}
            <Button
            as={RouterLink}
            to={`/schemes/${scheme.slug}`}
            size="sm"
            variant="outline"
            colorScheme="blue"
            rightIcon={<IconArrowRight size={16} />}
            borderRadius="lg"
            mt={2}
            _hover={{ bg: "blue.50" }}
            >
            View Details
            </Button>
        </VStack>
        </Box>
    );
};

export default SchemeCard;