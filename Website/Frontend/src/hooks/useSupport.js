
import { useDispatch, useSelector } from "react-redux";
import { createTicketThunk, resetSupportState } from "../features/support/supportSlice";

export const useSupport = () => {
    
    const dispatch = useDispatch();
    const { loading, success, error } = useSelector((state) => state.support);

    const submitTicket = (formData) => {
        dispatch(createTicketThunk(formData));
    };

    const resetForm = () => {
        dispatch(resetSupportState());
    };

    return {
        loading,
        success,
        error,
        submitTicket,
        resetForm
    };
};