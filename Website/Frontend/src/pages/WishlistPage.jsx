import React from "react";
import { useWishlist } from "../hooks/useWishlist";
import {
  Box,
  Heading,
  SimpleGrid,
  Card,
  Text,
  Button,
  Stack,
  Badge,
} from "@chakra-ui/react";

const WishlistPage = () => {
  const { wishlist, loading, error, remove } = useWishlist();

  if (loading) {
    return (
      <Box textAlign="center" mt={20}>
        Loading...
      </Box>
    );
  }

  if (error) {
    return (
      <Box color="red.500" textAlign="center" mt={10}>
        Error: {error}
      </Box>
    );
  }

  if (!wishlist || wishlist.length === 0) {
    return (
      <Box textAlign="center" mt={10}>
        No items found.
      </Box>
    );
  }

  return (
    <Box p={8} maxW="1200px" mx="auto">
      <Heading mb={8} size="lg">
        My Wishlist
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
        {wishlist.map((item) => (
          <Card.Root
            key={item._id}
            variant="outline"
            borderRadius="lg"
            overflow="hidden"
          >
            <Card.Body>
              <Stack gap={4}>
                <Heading size="md">
                  {item.schemeId?.title || "Untitled Scheme"}
                </Heading>

                <Badge colorPalette="purple" width="fit-content">
                  {item.reminderDate
                    ? new Date(item.reminderDate).toLocaleDateString("en-IN")
                    : "No Reminder"}
                </Badge>

                <Text fontSize="sm" color="gray.600">
                  <strong>Notes:</strong> {item.notes || "No notes"}
                </Text>

                <Button
                  size="sm"
                  colorPalette="red"
                  variant="outline"
                  onClick={() => remove(item._id)}
                >
                  Remove
                </Button>
              </Stack>
            </Card.Body>
          </Card.Root>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default WishlistPage;