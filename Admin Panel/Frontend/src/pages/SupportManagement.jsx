
import React, {useEffect} from "react";
import {useSupport} from "../hooks/useSupport";
import SupportTable from "../features/support/components/SupportTable";

const SupportManagement = ()=>{

    const {
        tickets,
        getTickets,
        loading
    } = useSupport();

    useEffect(()=>{
        getTickets();
    },[]);

    if(loading) return <div>Loading...</div>

    return(
        <div className="p-5">
            <h1 className="text-xl font-bold mb-5">
                Support Tickets
            </h1>
            <SupportTable tickets={tickets}/>
        </div>
    )

}
export default SupportManagement;