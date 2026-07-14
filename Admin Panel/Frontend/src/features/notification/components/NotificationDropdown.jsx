
import React, { useEffect } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { useNotification } from "../../../hooks/useNotification";

const NotificationDropdown = () => {
    const { notifications, getNotifications, markRead } = useNotification();

    useEffect(() => {
        getNotifications();
    }, []);

    const unreadCount = notifications.filter((item) => !item.isRead).length;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div 
                    className="relative cursor-pointer flex items-center justify-center h-10 w-10 rounded-md hover:bg-muted"
                >
                    <Bell size={20} />

                    {unreadCount > 0 && (
                        <span 
                            className="
                            absolute 
                            -top-1 
                            -right-1 
                            flex 
                            h-4 
                            w-4 
                            items-center 
                            justify-center 
                            rounded-full 
                            bg-red-500 
                            text-[10px] 
                            font-bold 
                            text-white"
                        >
                            {unreadCount}
                        </span>
                    )}

                </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-80">
                {notifications.length === 0 ? (
                    <div className="p-4 text-center text-sm text-muted-foreground">
                        No notifications
                    </div>
                ) : (
                    notifications.map((notification) => (
                        <DropdownMenuItem
                            key={notification._id}
                            onClick={() => markRead(notification._id)}
                            className={`flex flex-col items-start gap-1 p-3 cursor-pointer ${
                                notification.isRead ? "opacity-60" : "font-semibold"
                            }`}
                        >
                            <p className="text-sm">{notification.title}</p>
                            <p className="text-xs text-muted-foreground">
                                {notification.message}
                            </p>
                        </DropdownMenuItem>
                    ))
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default NotificationDropdown;