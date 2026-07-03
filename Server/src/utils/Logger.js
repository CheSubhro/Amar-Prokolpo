
// npm i winston

import winston from 'winston';
import { ActivityLog } from "../models/activityLog.model.js";

// Winston Configuration
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

// Database Logger
export const logActivity = async (adminId, action, targetUserId, details) => {
  try {
      await ActivityLog.create({ adminId, action, targetUserId, details });
  } catch (error) {
      logger.error("Failed to save activity log to database: " + error.message);
  }
};

export default logger;