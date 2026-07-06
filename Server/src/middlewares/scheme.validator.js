
import { body, validationResult } from 'express-validator';
import { ApiError } from '../utils/ApiError.js';
import HttpStatus from '../utils/HttpStatus.js';

export const validateScheme = [
    body('title')
        .trim()
        .notEmpty().withMessage('Title is required')
        .isLength({ min: 5 }).withMessage('Title must be at least 5 characters long'),

    body('shortDescription')
        .trim()
        .notEmpty().withMessage('Short description is required'),

    body('description')
        .trim()
        .notEmpty().withMessage('Full description is required'),

    body('category')
        .isMongoId().withMessage('Invalid Category ID format'),

    body('status')
        .optional()
        .isIn(['Active', 'Expired', 'Upcoming']).withMessage('Status must be Active, Expired, or Upcoming'),

    body('helplineNumber')
        .optional()
        .isLength({ min: 10, max: 15 }).withMessage('Helpline number is invalid'),

    body('officialEmail')
        .optional()
        .isEmail().withMessage('Invalid email format'),

    body('benefits')
        .optional()
        .isArray().withMessage('Benefits must be an array'),

    body('eligibility')
        .optional()
        .isArray().withMessage('Eligibility must be an array'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new ApiError(HttpStatus.BAD_REQUEST, errors.array()[0].msg);
        }
        next();
    }
];