import { z } from "zod";

/**
 * Login: payload matches POST /api/v1/auth/login -> { email, password }
 */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Please enter your email")
    .email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

/**
 * Register: payload matches POST /api/v1/auth/register -> { name, username, email, password }
 */
export const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username can be at most 30 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores",
    ),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
