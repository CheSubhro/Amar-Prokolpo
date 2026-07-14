
import React from "react";
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

const SupportTable = ({ tickets }) => {

    const getPriorityColor = (priority) => {
        switch (priority?.toLowerCase()) {
            case "high": return "destructive";
            case "medium": return "warning";
            default: return "secondary";
        }
    };

    return (
        <div className="rounded-md border shadow-sm">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tickets?.map((ticket) => (
                        <TableRow key={ticket._id}>
                        <TableCell className="font-medium">{ticket.name}</TableCell>
                        <TableCell>{ticket.subject}</TableCell>
                        <TableCell>
                            <Badge variant={getPriorityColor(ticket.priority)}>
                            {ticket.priority}
                            </Badge>
                        </TableCell>
                        <TableCell>
                            <Badge variant={ticket.status === "Open" ? "default" : "outline"}>
                            {ticket.status}
                            </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                            <Button variant="ghost" size="sm">Reply</Button>
                        </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default SupportTable;