import { z } from "zod";

// Question/Challenge Types
export const QuestionType = z.enum(["EASY", "MEDIUM", "HARD"]);

// Platform-specific solution schemas
const leetcodeSolution = z.object({
  questionID: z.number(),
  questionTitle: z.string(),
  questionType: QuestionType,
});

const geeksforgeeksSolution = z.object({
  questionID: z.number(),
  questionTitle: z.string(),
  questionType: QuestionType,
});

const codechefSolution = z.object({
  questionID: z.number(),
  questionTitle: z.string(),
  questionPoints: z.number(),
});

const githubCommit = z.object({
  commitId: z.number(),
  commitMessage: z.string(),
  commitRepo: z.string(),
});

// Platform progress schemas
const platformProgress = z.object({
  leetcode: z
    .object({
      solvedQuestions: z.number(),
      goal: z.number(),
      solutions: z.array(leetcodeSolution),
    })
    .optional(),
  geeksforgeeks: z
    .object({
      solvedQuestions: z.number(),
      goal: z.number(),
      solutions: z.array(geeksforgeeksSolution),
    })
    .optional(),
  codechef: z
    .object({
      solvedQuestions: z.number(),
      goal: z.number(),
      solutions: z.array(codechefSolution),
    })
    .optional(),
  gitHub: z
    .object({
      commitsMade: z.number(),
      goal: z.number(),
      commitInfo: z.array(githubCommit),
    })
    .optional(),
});

// Task content schema
export const taskContentSchema = z.object({
  date: z.string().or(z.date()),
  isBreakDay: z.boolean(),
  // Platform progress is optional since it won't exist on break days
  ...platformProgress.partial().shape,
});

// Challenge creation schema
export const createChallengeSchema = z.object({
  title: z.string().min(3).max(255),
  type: z.string(),
  description: z.string(),
  totalBreakDays: z.number().int().min(0),
  startingDate: z.string().transform((date) => new Date(date)),
  endingDate: z.string().transform((date) => new Date(date)),
  platformTargets: z.array(
    z.object({
      platform: z.string(),
      goal: z.number().int().min(1),
    })
  ),
});
