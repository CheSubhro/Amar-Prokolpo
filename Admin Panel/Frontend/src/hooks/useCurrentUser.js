
import { useEffect, useState } from "react";
import authService from "../services/authService";

export const useCurrentUser = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);

                const user = await authService.getCurrentUser();

                setUser(user);
            } catch (err) {
                console.error(err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return {
        user,
        loading,
        error,
    };
};