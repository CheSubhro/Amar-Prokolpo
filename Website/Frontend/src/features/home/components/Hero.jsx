
import React from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  Badge,
  VStack,
  Container,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { IconArrowRight, IconBuildingBank } from "@tabler/icons-react";

const Hero = () => {
    return (
        <Box
            as="section"
            position="relative"
            bg="blue.900"
            color="white"
            overflow="hidden"
            py={{ base: 20, sm: 28 }}
        >
        {/* Background Pattern */}
        <Box
            position="absolute"
            inset={0}
            opacity={0.1}
            bgImage="radial-gradient(#ffffff 1px, transparent 1px)"
            bgSize="20px 20px"
        />

        <Container maxW="container.xl" position="relative" zIndex={1}>
            <VStack align="start" maxW="3xl" spacing={8}>
            
            {/* Badge */}
            <Badge
                display="flex"
                alignItems="center"
                gap={2}
                px={4}
                py={1.5}
                bg="blue.800"
                color="blue.200"
                borderRadius="full"
                fontSize="sm"
                fontWeight="medium"
            >
                <IconBuildingBank size={16} />
                Government Schemes Information Portal
            </Badge>

            {/* Heading */}
            <Heading
                as="h1"
                fontSize={{ base: "4xl", sm: "5xl", lg: "6xl" }}
                fontWeight="bold"
                lineHeight="1.2"
            >
                Find All{" "}
                <Text as="span" color="cyan.300">
                Government Schemes
                </Text>
                <br />
                In One Place
            </Heading>

            {/* Subtitle */}
            <Text
                fontSize={{ base: "md", sm: "lg" }}
                color="gray.200"
                lineHeight="1.7"
                maxW="90%"
            >
                Easily access accurate information regarding benefits, eligibility
                criteria, application procedures, and required documentation for
                various Central and State government schemes.
            </Text>

            {/* CTA Button */}
            <Button
                as={RouterLink}
                to="/support"
                size="lg"
                colorScheme="cyan"
                rightIcon={<IconArrowRight size={18} />}
                borderRadius="xl"
                px={8}
                py={7}
                _hover={{ transform: "translateY(-2px)", shadow: "lg" }}
                transition="all 0.3s"
            >
                Need Help?
            </Button>
            
            </VStack>
        </Container>
        </Box>
    );
};

export default Hero;