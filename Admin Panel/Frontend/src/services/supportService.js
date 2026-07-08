
import api from './api';

const createTicket = async (ticketData) => {
    const response = await api.post('/support/create', ticketData);
    return response.data;
};

const supportService = { 
    createTicket
};
export default supportService;