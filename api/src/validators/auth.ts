import { z } from "zod";

export const signupSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Invalid email format")
    .max(254, "Email too long"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password too long")
    .regex(/[A-Z]/, "Password must contain an uppercase letter")
    .regex(/[a-z]/, "Password must contain a lowercase letter")
    .regex(/[0-9]/, "Password must contain a digit")
    .regex(/[^A-Za-z0-9]/, "Password must contain a special character"),
  name: z.string().trim().max(50, "Name too long").optional(),
});

export const signinSchema = z.object({
  email: z.string().trim().email("Invalid email format").max(254),
  password: z.string().min(1, "Password is required").max(128),
});
