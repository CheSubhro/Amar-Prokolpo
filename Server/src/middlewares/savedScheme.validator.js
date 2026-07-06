
import { body } from 'express-validator';

export const validateSaveScheme = [
    body('schemeId').isMongoId().withMessage('Invalid Scheme ID')
];