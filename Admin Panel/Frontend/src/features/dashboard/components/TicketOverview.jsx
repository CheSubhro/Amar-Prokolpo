
import React from "react";
import { Badge } from "@/components/ui/badge";

const TicketOverview = ({ tickets }) => {
    
    const pending = tickets.filter((t) => t.status === "Pending").length;
    const progress = tickets.filter((t) => t.status === "In-Progress").length;
    const resolved = tickets.filter((t) => t.status === "Resolved").length;

    const stats = [
        { label: "Pending", count: pending, color: "bg-yellow-100 text-yellow-800" },
        { label: "In Progress", count: progress, color: "bg-blue-100 text-blue-800" },
        { label: "Resolved", count: resolved, color: "bg-green-100 text-green-800" },
    ];

    return (
        <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h2 className="mb-4 font-bold text-lg tracking-tight">
                Support Overview
            </h2>

            <div className="space-y-3">
                {stats.map((stat) => (
                    <div key={stat.label} className="flex items-center justify-between">
                        <span className="text-sm font-medium text-muted-foreground">
                            {stat.label}
                        </span>
                        <Badge className={`${stat.color} hover:${stat.color}`}>
                            {stat.count}
                        </Badge>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TicketOverview;