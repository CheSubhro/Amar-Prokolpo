
import React from "react";
import {
  Badge,
  Box,
  Button,
  Heading,
  Image,
  Link,
  List,
  ListItem,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";

import {
  IconCalendar,
  IconCategory,
  IconExternalLink,
  IconMail,
  IconPhone,
  IconEye,
  IconStarFilled,
} from "@tabler/icons-react";

const SchemeDetailsCard = ({ scheme }) => {

  if (!scheme) return null;

  const formatDate = (date) => {
    if (!date) return "Not Available";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const ListSection = ({ title, items }) => (
    <Box
      bg="white"
      p={6}
      borderRadius="xl"
      border="1px solid"
      borderColor="gray.200"
    >
      <Heading size="md" mb={5}>
        {title}
      </Heading>

      {items?.length ? (
        <VStack align="stretch" gap={2}>
        {items.map((item, index) => (
          <Box key={index} display="flex" alignItems="flex-start">
            <Text color="blue.500" mr={2}>
              •
            </Text>
      
            <Text>{item}</Text>
          </Box>
        ))}
      </VStack>
      ) : (
        <Text color="gray.500">
          Not Available
        </Text>
      )}
    </Box>
  );

  return (

    <Stack spacing={8}>

      {/* Banner */}

      <Image
        src={scheme.image}
        alt={scheme.title}
        w="100%"
        h={{
          base: "220px",
          md: "320px",
        }}
        objectFit="cover"
        borderRadius="2xl"
      />

      {/* Title */}

      <Box>

        <Stack
          direction="row"
          flexWrap="wrap"
          mb={4}
        >

          {scheme.category && (
            <Badge colorScheme="blue">
              {scheme.category.name}
            </Badge>
          )}

          {scheme.featured && (
            <Badge colorScheme="yellow">
              Featured
            </Badge>
          )}

          <Badge
            colorScheme={
              scheme.status === "ACTIVE"
                ? "green"
                : "red"
            }
          >
            {scheme.status}
          </Badge>

        </Stack>

        <Heading mb={4}>
          {scheme.title}
        </Heading>

        <Text
          fontSize="lg"
          color="gray.600"
        >
          {scheme.shortDescription}
        </Text>

      </Box>


      <SimpleGrid
        columns={{
          base: 1,
          lg: 3,
        }}
        gap={8}
      >

        {/* LEFT */}

        <Box gridColumn="span 2">

          <VStack
            spacing={8}
            align="stretch"
          >

            <Box>

              <Heading
                size="md"
                mb={4}
              >
                About this Scheme
              </Heading>

              <Text
                color="gray.700"
                lineHeight="2"
              >
                {scheme.description}
              </Text>

            </Box>

            <ListSection
              title="Benefits"
              items={scheme.benefits}
            />

            <ListSection
              title="Eligibility"
              items={scheme.eligibility}
            />

            <ListSection
              title="Required Documents"
              items={scheme.requiredDocuments}
            />

            <ListSection
              title="Application Process"
              items={scheme.applicationProcess}
            />

          </VStack>

        </Box>

        {/* RIGHT */}

        <Box>

          <Box
            bg="white"
            borderRadius="xl"
            border="1px solid"
            borderColor="gray.200"
            p={6}
            position="sticky"
            top="90px"
          >

            <Heading
              size="md"
              mb={6}
            >
              Scheme Information
            </Heading>

            <VStack
              align="stretch"
              spacing={5}
            >

              <Stack direction="row">
                <IconCategory size={20}/>
                <Text>
                  <b>Category:</b>{" "}
                  {scheme.category?.name}
                </Text>
              </Stack>

              <Stack direction="row">
                <IconCalendar size={20}/>
                <Text>
                  <b>Deadline:</b>{" "}
                  {formatDate(
                    scheme.deadline
                  )}
                </Text>
              </Stack>

              <Stack direction="row">
                <IconPhone size={20}/>
                <Text>
                  <b>Helpline:</b>{" "}
                  {scheme.helplineNumber ||
                    "N/A"}
                </Text>
              </Stack>

              <Stack direction="row">
                <IconMail size={20}/>
                <Text>
                  <b>Email:</b>{" "}
                  {scheme.officialEmail ||
                    "N/A"}
                </Text>
              </Stack>

              <Stack direction="row">
                <IconEye size={20}/>
                <Text>
                  <b>Views:</b>{" "}
                  {scheme.viewCount}
                </Text>
              </Stack>

              {scheme.featured && (
                <Stack direction="row">
                  <IconStarFilled
                    size={20}
                    color="#EAB308"
                  />
                  <Text>
                    Featured Scheme
                  </Text>
                </Stack>
              )}

              {scheme.applicationLink && (

                <Button
                  mt={4}
                  colorScheme="blue"
                  size="lg"
                  as={Link}
                  href={
                    scheme.applicationLink
                  }
                  isExternal
                  rightIcon={
                    <IconExternalLink
                      size={18}
                    />
                  }
                >
                  Apply Now
                </Button>

              )}

            </VStack>

          </Box>

        </Box>

      </SimpleGrid>

    </Stack>

  );

};

export default SchemeDetailsCard;