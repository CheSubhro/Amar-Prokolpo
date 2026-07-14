
import React from "react";
import { MessageSquareText } from "lucide-react"; 

const ReviewOverview = ({ reviews }) => {
    return (
        <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-lg tracking-tight">
                    Pending Reviews
                </h2>
                <MessageSquareText className="h-5 w-5 text-muted-foreground" />
            </div>

            <div className="flex items-baseline gap-2">
                <p className="text-4xl font-bold tracking-tight">
                    {reviews?.length || 0}
                </p>
                <p className="text-sm text-muted-foreground">
                    items waiting for approval
                </p>
            </div>
        </div>
    );
};

export default ReviewOverview;