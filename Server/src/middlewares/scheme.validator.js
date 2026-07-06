
import { body, validationResult } from 'express-validator';
import { ApiError } from '../utils/ApiError.js';
import HttpStatus from '../utils/HttpStatus.js';


const parseArrayFields = (req, res, next) => {
    ['benefits', 'eligibility', 'requiredDocuments', 'applicationProcess', 'faqs'].forEach(field => {
        if (req.body[field] && typeof req.body[field] === 'string') {
            try {
                req.body[field] = JSON.parse(req.body[field]);
            } catch (e) {
                req.body[field] = []; 
            }
        }
    });
    next();
};
export const validateScheme = [
    parseArrayFields,
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
    
    body('requiredDocuments')
        .optional()
        .isArray().withMessage('Required Documents must be an array'),

    body('applicationProcess')
        .optional()
        .isArray().withMessage('Application Process must be an array'),

    body('faqs')
        .optional()
        .isArray().withMessage('FAQs must be an array'),    

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new ApiError(HttpStatus.BAD_REQUEST, errors.array()[0].msg);
        }
        next();
    }
];