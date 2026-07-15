
import { useDispatch, useSelector } from "react-redux";
import { login as loginAction } from "../features/auth/authSlice";

export const useAuth = () => {
    
    const dispatch = useDispatch();
    const { user, loading, error } = useSelector((state) => state.auth);

    const login = async (data) => await dispatch(loginAction(data));

    return { user, loading, error, login };
};