
import React from "react";

const TopSchemes = ({ schemes }) => {
    return (
        <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h2 className="mb-4 font-bold text-lg tracking-tight">
                Top Viewed Schemes
            </h2>

            {schemes && schemes.length > 0 ? (
                <div className="space-y-1">
                    {schemes.map((item) => (
                        <div
                            key={item._id}
                            className="flex items-center justify-between border-b py-3 last:border-0 last:pb-0"
                        >
                            <span className="text-sm font-medium">
                                {item.title}
                            </span>
                            <span className="text-xs font-semibold text-muted-foreground bg-secondary px-2 py-1 rounded-full">
                                {item.viewCount} views
                            </span>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                    No schemes available.
                </p>
            )}
        </div>
    );
};

export default TopSchemes;