
import React, { useEffect } from "react";
import { useDashboard } from "../hooks/useDashboard";
import StatCard from "../features/dashboard/components/StatCard";
import TopSchemes from "../features/dashboard/components/TopSchemesChart";
import TicketOverview from "../features/dashboard/components/TicketOverview";
import ReviewOverview from "../features/dashboard/components/ReviewOverview";
import NotificationList from "../features/dashboard/components/NotificationList";

const Dashboard = () => {

    const {
        loadDashboard,
        schemes,
        topSchemes,
        tickets,
        reviews,
        notifications,
        loading
    } = useDashboard();

    useEffect(() => {
        loadDashboard();
    }, []);

    if (loading) {
        return (
            <div className="flex h-[80vh] items-center justify-center">
                <p className="text-muted-foreground animate-pulse font-medium">Loading Dashboard Data...</p>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
                <p className="text-muted-foreground">Overview of system performance and activities.</p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Schemes" value={schemes.length} />
                <StatCard 
                    title="Active Schemes" 
                    value={schemes.filter((s) => s.status === "Active").length} 
                />
                <StatCard title="Pending Reviews" value={reviews.length} />
                <StatCard title="Support Tickets" value={tickets.length} />
            </div>

            {/* Charts/Overviews */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TopSchemes schemes={topSchemes} />
                <TicketOverview tickets={tickets} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ReviewOverview reviews={reviews} />
                <NotificationList notifications={notifications} />
            </div>
        </div>
    );
};

export default Dashboard;