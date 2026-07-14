
import React from "react";

const StatCard = ({ title, value }) => {
    return (
        <div className="rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md">
            <p className="text-sm font-medium text-muted-foreground">
                {title}
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">
                {value}
            </h2>
        </div>
    );
};

export default StatCard;