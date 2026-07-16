
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postReview } from "../reviewSlice"; 
import { VStack, Input, Textarea, Button, NumberInput, NumberInputField, FormControl, FormLabel } from "@chakra-ui/react";

const ReviewForm = ({ schemeId, onClose }) => {
    
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(5);
    const dispatch = useDispatch();

    const handleSubmit = async () => {
        const reviewData = { schemeId, comment, rating };
        await dispatch(postReview(reviewData));
        onClose(); 
    };

    return (
        <VStack spacing={4}>
            <FormControl>
                <FormLabel>Rating (1-5)</FormLabel>
                <NumberInput min={1} max={5} value={rating} onChange={(val) => setRating(val)}>
                    <NumberInputField />
                </NumberInput>
            </FormControl>
            <FormControl>
                <FormLabel>Your Success Story</FormLabel>
                <Textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Write your experience..." />
            </FormControl>
            <Button colorScheme="blue" w="full" onClick={handleSubmit}>
                Submit Review
            </Button>
        </VStack>
    );
};

export default ReviewForm;