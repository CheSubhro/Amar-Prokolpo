
import { body, validationResult } from 'express-validator';
import { ApiError } from '../utils/ApiError.js';
import HttpStatus from '../utils/HttpStatus.js';

export const validateCategory = [
    body('name')
        .trim()
        .notEmpty().withMessage('Category name is required')
        .isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    
    body('description')
        .optional()
        .isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters'),
    
    body('order')
        .optional()
        .isNumeric().withMessage('Order must be a valid number'),

    body('isActive')
        .optional()
        .isBoolean().withMessage('isActive must be a boolean value'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new ApiError(HttpStatus.BAD_REQUEST, errors.array()[0].msg);
        }
        next();
    }
];