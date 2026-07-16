
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import { ErrorBoundary } from "./components/common";
import MainLayout from "./layouts/MainLayout";
import AppRoutes from "./routes/AppRoutes";
import { getCurrentUser } from "./features/auth/authSlice";
import { Toaster } from "sonner";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const hasSession = document.cookie.length > 0;

        if (!hasSession) return;

        dispatch(getCurrentUser()).catch(() => {});
    }, [dispatch]);

    return (
        <Router>
            <ErrorBoundary>
                <Toaster position="top-right" richColors />
                <MainLayout>
                    <AppRoutes />
                </MainLayout>
            </ErrorBoundary>
        </Router>
    );
}

export default App;