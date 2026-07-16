
import api from "./api"; 

export const supportService = {
    createTicket: async (ticketData) => {
        return await api.post("/support/create", ticketData);
    },
};