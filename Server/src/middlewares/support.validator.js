
import { body, validationResult } from 'express-validator';
import { ApiError } from '../utils/ApiError.js';
import HttpStatus from '../utils/HttpStatus.js';

export const validateSupport = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 2 }).withMessage('Name must be at least 2 characters long'),

    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please provide a valid email address'),

    body('subject')
        .trim()
        .notEmpty().withMessage('Subject is required')
        .isLength({ min: 5 }).withMessage('Subject must be at least 5 characters long'),

    body('message')
        .trim()
        .notEmpty().withMessage('Message is required')
        .isLength({ min: 10 }).withMessage('Message must be at least 10 characters long'),

    body('phoneNumber')
        .optional()
        .isMobilePhone().withMessage('Please provide a valid phone number'),

    body('priority')
        .optional()
        .isIn(['Low', 'Medium', 'High']).withMessage('Priority must be Low, Medium, or High'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new ApiError(HttpStatus.BAD_REQUEST, errors.array()[0].msg);
        }
        next();
    }
];