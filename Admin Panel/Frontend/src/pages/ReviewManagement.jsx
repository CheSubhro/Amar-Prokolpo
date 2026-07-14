
import React, { useEffect } from "react";
import { useReview } from "../hooks/useReview";
import ReviewTable from "../features/review/components/ReviewTable";

const ReviewManagement = () => {
    const { reviews, loading, getReviews } = useReview();

    useEffect(() => {
        getReviews();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-muted-foreground animate-pulse">Loading reviews...</p>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Pending Reviews</h1>
                <p className="text-sm text-muted-foreground">
                    Manage and moderate user reviews for your schemes.
                </p>
            </div>

            <ReviewTable reviews={reviews} />
        </div>
    );
};

export default ReviewManagement;