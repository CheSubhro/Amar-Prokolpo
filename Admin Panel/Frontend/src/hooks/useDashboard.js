
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboard } from "../features/dashboard/dashboardSlice";

export const useDashboard = () => {
    const dispatch = useDispatch();

    const dashboardState = useSelector((state) => state.dashboard);

    const loadDashboard = () => {
        dispatch(fetchDashboard());
    };

    return {
        ...dashboardState,
        loadDashboard
    };
};