
import React from "react";

const NotificationList = ({ notifications }) => {
    return (
        <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h2 className="mb-4 font-bold text-lg tracking-tight">
                Notifications
            </h2>

            {notifications && notifications.length > 0 ? (
                <div className="space-y-1">
                    {notifications.slice(0, 5).map((item) => (
                        <div
                            key={item._id}
                            className="border-b py-3 text-sm last:border-0 last:pb-0 hover:bg-slate-50 transition-colors px-2 rounded"
                        >
                            <p className="text-foreground leading-snug">
                                {item.message}
                            </p>
                            <span className="text-[10px] text-muted-foreground uppercase font-semibold">
                                {new Date(item.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                    No new notifications.
                </p>
            )}
        </div>
    );
};

export default NotificationList;