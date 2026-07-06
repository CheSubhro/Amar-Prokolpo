
import { Support } from "../models/support.model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js"; 
import { logActivity } from "../utils/Logger.js"; 
import HttpStatus from "../utils/HttpStatus.js";

const createSupportTicket = asyncHandler(async (req, res) => {

    const { name, email, phoneNumber, subject, message, priority } = req.body;

    if (!name || !email || !subject || !message) {
        throw new ApiError(HttpStatus.BAD_REQUEST, "Required fields are missing");
    }

    const ticket = await Support.create({
        userId: req.user?._id, 
        name, email, phoneNumber, subject, message, priority
    });

    await logActivity(req.user?._id || "Guest", "CREATE_SUPPORT_TICKET", `New ticket created: ${subject}`);

    res.status(HttpStatus.CREATED).json(new ApiResponse(HttpStatus.CREATED, ticket, "Support ticket submitted"));
});

const getAllTickets = asyncHandler(async (req, res) => {

    const tickets = await Support.find().sort({ createdAt: -1 });
    res.status(HttpStatus.OK).json(new ApiResponse(HttpStatus.OK, tickets, "Tickets fetched"));
});

const respondToTicket = asyncHandler(async (req, res) => {

    const { ticketId } = req.params;
    const { adminResponse, status } = req.body;

    const ticket = await Support.findByIdAndUpdate(
        ticketId,
        { adminResponse, status },
        { new: true }
    );

    if (!ticket) throw new ApiError(HttpStatus.NOT_FOUND, "Ticket not found");

    res.status(HttpStatus.OK).json(new ApiResponse(HttpStatus.OK, ticket, "Response added to ticket"));
});

export { 
    createSupportTicket, 
    getAllTickets, 
    respondToTicket 
};