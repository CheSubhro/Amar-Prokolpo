
import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useSupport } from "../../../hooks/useSupport";

const TicketResponse = ({ ticket, open, setOpen }) => {
    const { respond } = useSupport();
    const [response, setResponse] = useState(ticket?.adminResponse || "");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!response.trim()) {
            toast.error("Please enter a response");
            return;
        }

        try {
            setLoading(true);
            await respond(ticket._id, {
                adminResponse: response,
                status: "Resolved"
            });
            toast.success("Response sent successfully");
            setOpen(false);
        } catch (error) {
            toast.error("Failed to send response");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Respond to Ticket</DialogTitle>
                </DialogHeader>

                <div className="space-y-5">
                    {/* User Info Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label className="text-xs text-muted-foreground">User Name</Label>
                            <p className="text-sm font-medium">{ticket?.name}</p>
                        </div>
                        <div>
                            <Label className="text-xs text-muted-foreground">User Email</Label>
                            <p className="text-sm font-medium">{ticket?.email}</p>
                        </div>
                    </div>

                    {/* Subject */}
                    <div>
                        <Label className="text-xs text-muted-foreground">Subject</Label>
                        <p className="text-sm font-medium">{ticket?.subject}</p>
                    </div>

                    {/* User Message */}
                    <div>
                        <Label className="text-xs text-muted-foreground">User Message</Label>
                        <p className="bg-slate-50 border rounded-md p-3 text-sm text-slate-700 min-h-[80px]">
                            {ticket?.message}
                        </p>
                    </div>

                    {/* Admin Response */}
                    <div>
                        <Label>Admin Response</Label>
                        <Textarea
                            value={response}
                            onChange={(e) => setResponse(e.target.value)}
                            placeholder="Write your response here..."
                            className="mt-1.5 focus:ring-2 focus:ring-blue-500"
                            rows={4}
                        />
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                        <Button variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button disabled={loading} onClick={handleSubmit}>
                            {loading ? "Sending..." : "Send Reply"}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default TicketResponse;