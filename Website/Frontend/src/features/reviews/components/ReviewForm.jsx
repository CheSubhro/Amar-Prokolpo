
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postReview } from "../reviewSlice";
import { validateReviewForm } from "../../../utils/validation";
import { 
    Button, 
    Textarea, 
    VStack, 
    Field, 
    Input 
} from "@chakra-ui/react";

const ReviewForm = ({ schemeId, onClose }) => {
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(5);
    const [formError, setFormError] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError("");
        const reviewData = { schemeId: schemeId, comment, rating: Number(rating) };
        const validation = validateReviewForm(reviewData);
        if (!validation.isValid) {
            setFormError(validation.message);
            return;
        }

        await dispatch(postReview(reviewData));
        onClose();
    };

    return (
        <form onSubmit={handleSubmit}>
            <VStack spacing={4} align="stretch">
                {formError && <Text color="red.500" fontSize="sm">{formError}</Text>}
                <Field.Root>
                    <Field.Label>Rating (1-5)</Field.Label>
                    <Input 
                        type="number"
                        min={1} 
                        max={5} 
                        value={rating} 
                        onChange={(e) => setRating(e.target.value)}
                    />
                </Field.Root>

                {/* Comment Field */}
                <Field.Root required>
                    <Field.Label>Your Success Story</Field.Label>
                    <Textarea 
                        value={comment} 
                        onChange={(e) => setComment(e.target.value)} 
                        placeholder="Write your experience..." 
                        rows={4}
                    />
                </Field.Root>

                <Button type="submit" colorScheme="blue" w="full">
                    Submit Review
                </Button>
            </VStack>
        </form>
    );
};

export default ReviewForm;