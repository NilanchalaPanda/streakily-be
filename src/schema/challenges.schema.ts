import { z } from "zod";

export const challengeSchema = z.object({
  title: z.string().min(3).max(255),
  type: z.string(),
  description: z.string().min(3).max(255),
  startingDate: z.date(),
  endingDate: z.date(),
  points: z.number().int(),
  streaks: z.number().int(),
  status: z.enum(["ACTIVE", "STALLED", "COMPLETED"]),
});
