
import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useReview } from "../../../hooks/useReview";

const ReviewStatusDialog = ({ review, open, setOpen }) => {
    
    const { updateStatus } = useReview();
    const [loading, setLoading] = useState(false);

    const handleStatus = async (status) => {
        try {
            setLoading(true);
            await updateStatus(review._id, status);
            toast.success(`Review ${status} successfully`);
            setOpen(false);
        } catch (error) {
            toast.error(`Failed to ${status} review`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Review Approval</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 py-2">
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">User:</p>
                        <p className="text-sm font-semibold">{review.userId?.fullName}</p>
                    </div>

                    <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Comment:</p>
                        <div className="rounded-md border p-3 text-sm italic bg-slate-50">
                            "{review.comment}"
                        </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <Button 
                            className="flex-1" 
                            disabled={loading}
                            onClick={() => handleStatus("Approved")}
                        >
                            {loading ? "Processing..." : "Approve"}
                        </Button>
                        <Button 
                            variant="destructive" 
                            className="flex-1" 
                            disabled={loading}
                            onClick={() => handleStatus("Rejected")}
                        >
                            {loading ? "Processing..." : "Reject"}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ReviewStatusDialog;