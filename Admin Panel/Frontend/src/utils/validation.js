
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const userProfileSchema = z.object({
  fullName: z.string().min(3, "Name must be at least 3 characters"),
  phoneNumber: z.string().regex(/^\d{11}$/, "Phone number must be 11 digits"),
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