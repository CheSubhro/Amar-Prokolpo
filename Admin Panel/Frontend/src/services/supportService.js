
import api from "./api";

const getAllTickets = async () => {
    const response = await api.get("/support/all");
    return response.data.data;
};
const respondToTicket = async (ticketId, data) => {
    const response = await api.patch(`/support/respond/${ticketId}`,data);
    return response.data.data;
};

const supportService = {
    getAllTickets,
    respondToTicket
};

export default supportService;