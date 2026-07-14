
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useCurrentUser } from "../hooks/useCurrentUser";

const Profile = () => {
    
    const { user, loading } = useCurrentUser();

    if (loading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <p className="text-muted-foreground animate-pulse">Loading profile...</p>
            </div>
        );
    }

    if (!user) {
        return <div className="p-6 text-center text-red-500">User not found.</div>;
    }

    return (
        <div className="p-6">
            <Card className="max-w-2xl mx-auto border-none shadow-md">
                <CardHeader>
                    <CardTitle className="text-2xl">My Profile</CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                    {/* Profile Header */}
                    <div className="flex items-center gap-6">
                        <Avatar className="h-28 w-28 border-4 border-background shadow-lg">
                            <AvatarImage src={user?.avatar} alt={user?.username} />
                            <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">
                                {user?.username?.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <h2 className="text-3xl font-bold">{user?.fullName || user?.username}</h2>
                            <p className="text-muted-foreground">{user?.email}</p>
                            <Badge className="mt-3 capitalize" variant="secondary">
                                {user?.role}
                            </Badge>
                        </div>
                    </div>

                    {/* Profile Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t">
                        {[
                            { label: "Full Name", value: user?.fullName },
                            { label: "Username", value: user?.username },
                            { label: "Email Address", value: user?.email },
                            { label: "Account Role", value: user?.role },
                            { label: "Member Since", value: user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A" },
                        ].map((item, index) => (
                            <div key={index}>
                                <p className="text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-1">
                                    {item.label}
                                </p>
                                <p className="font-medium text-foreground">{item.value || "-"}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Profile;