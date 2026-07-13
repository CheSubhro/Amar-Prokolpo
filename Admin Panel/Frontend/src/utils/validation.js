
import { z } from "zod";

export const loginSchema = z.object({
	identifier: z.string().min(3, "Username or email is required"), 
	password: z.string().min(8, "Password must be at least 8 characters"),
});

export const userProfileSchema = z.object({
  fullName: z.string().min(3, "Name must be at least 3 characters"),
  phoneNumber: z.string().regex(/^\d{11}$/, "Phone number must be 11 digits"),
});

export const schemeSchema = z.object({
  title: z.string().min(3, "Title is required"),
  shortDescription: z.string().min(10, "Short description is required"),
  description: z.string().min(10, "Description is required"),
  category: z.string().min(1, "Category is required"),
  applicationLink: z.string().url("Invalid URL"),
  helplineNumber: z.string().min(10, "Valid number required"),
  officialEmail: z.string().email("Invalid email address"),
  deadline: z.string().min(1, "Deadline is required"),
  benefits: z.string().min(1, "Benefits are required"), 
  eligibility: z.string().min(1, "Eligibility is required"),
  requiredDocuments: z.string().min(1, "Required documents are required"),
  applicationProcess: z.string().min(1, "Application process is required"),
});

export const categorySchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  order: z.string().optional(), 
  isActive: z.boolean().default(true),
});

// Helper function to validate any schema
export const validateData = (schema, data) => {
    const result = schema.safeParse(data);
    return {
      success: result.success,
      data: result.data,
      errors: result.error ? result.error.flatten().fieldErrors : null,
    };
};