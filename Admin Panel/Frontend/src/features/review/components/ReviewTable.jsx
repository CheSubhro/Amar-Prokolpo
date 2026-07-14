
import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ReviewStatusDialog from "./ReviewStatusDialog";

const ReviewTable = ({ reviews }) => {
    
    const [selected, setSelected] = useState(null);

    return (
        <div className="border rounded-md shadow-sm">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Scheme</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Comment</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {reviews?.length > 0 ? (
                        reviews.map((review) => (
                            <TableRow key={review._id}>
                                <TableCell className="font-medium">
                                    {review.userId?.fullName || "N/A"}
                                </TableCell>
                                <TableCell>{review.schemeId?.title || "N/A"}</TableCell>
                                <TableCell>
                                    <Badge variant="secondary" className="gap-1">
                                        {review.rating} ⭐
                                    </Badge>
                                </TableCell>
                                <TableCell className="max-w-[200px] truncate">
                                    {review.comment}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => setSelected(review)}
                                    >
                                        Review
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                                No pending reviews found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {selected && (
                <ReviewStatusDialog
                    review={selected}
                    open={!!selected}
                    setOpen={() => setSelected(null)}
                />
            )}
        </div>
    );
};

export default ReviewTable;