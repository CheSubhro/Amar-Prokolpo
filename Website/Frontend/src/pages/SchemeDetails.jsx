
import React, { useEffect } from "react";
import { Container, Spinner, Center } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import useScheme from "../hooks/useScheme";
import SchemeDetailsCard from "../features/scheme/components/SchemeDetailsCard";

const SchemeDetails = () => {
    const { slug } = useParams();
    const {
        scheme,
        loading,
        error,
        getSchemeBySlug,
        resetScheme,
    } = useScheme();

    useEffect(() => {
        resetScheme();
        getSchemeBySlug(slug);
    }, [slug]);

    if (loading) {
        return (
            <Center h="60vh">
                <Spinner size="xl" color="blue.500" thickness="4px" />
            </Center>
        );
    }

    if (!scheme) return null;

    return (
        <Container maxW="7xl" py={10}>
            <SchemeDetailsCard scheme={scheme} />
        </Container>
    );
};

export default SchemeDetails;