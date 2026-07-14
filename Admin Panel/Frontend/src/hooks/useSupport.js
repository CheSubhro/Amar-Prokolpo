
import { useDispatch, useSelector } from "react-redux";

import {
    fetchAllTickets,
    replyTicket
} from "../features/support/supportSlice";

export const useSupport = ()=>{

    const dispatch = useDispatch();
    const {
        tickets,
        loading,
        error
    } = useSelector(
        state=>state.support
    );
    const getTickets = ()=>{
        dispatch(fetchAllTickets());
    };
    const respond = (ticketId,data)=>{
        return dispatch(
            replyTicket({
                ticketId,
                data
            })
        );
    };
    return {
        tickets,
        loading,
        error,
        getTickets,
        respond
    };

};