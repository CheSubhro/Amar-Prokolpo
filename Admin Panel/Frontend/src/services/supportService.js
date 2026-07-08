
import api from './api';

const createTicket = async (ticketData) => {
    const response = await api.post('/support/create', ticketData);
    return response.data;
};

const respondToTicket = async (ticketId, responseData) => {
    const response = await api.patch(`/support/respond/${ticketId}`, responseData);
    return response.data;
};

const supportService = { 
    createTicket,
    respondToTicket
};
export default supportService;