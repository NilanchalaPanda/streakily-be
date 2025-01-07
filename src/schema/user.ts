import { z } from "zod";

// USER SCHEMA-
/*
    userName       String  @unique
  name           String  @db.VarChar(255)
  email          String  @unique
  password       String
  isVerified     Boolean @default(false)
  avatarUrl      String?
  totalPoints    Int?
  longestStreaks Int?    @default(0)
     */

export const SignUpSchema = z.object({
  userName: z.string().min(3, "Username must be at least 3 characters long"),
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  isVerified: z.boolean().default(false),
  avatarUrl: z.string().nullish(),
  totalPoints: z.number().nullish(),
  longestStreaks: z.number().nullish().default(0),
});

export const LoginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});
