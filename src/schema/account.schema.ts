import { z } from "zod";

export const LeetcodeSchema = z.object({
  username: z.string(),
  uniqueCode: z.string().min(6, "Code should be atleast 6 characters long"),
});
