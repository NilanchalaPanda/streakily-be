// src/controllers/challengeController.ts
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { differenceInDays } from "date-fns";
import { z } from "zod";
import { customRequest } from "../types/express";
import { createChallengeSchema } from "../schema/challenges.schema";

const prisma = new PrismaClient();

export const createChallenge = async (req: customRequest, res: Response) => {
  try {
    createChallengeSchema.parse(req.body);
    const { userId } = req.user;
    const data = req.body;

    // Validate dates
    if (data.startingDate >= data.endingDate) {
      return res.status(400).json({
        error: "End date must be after start date",
      });
    }

    // Calculate challenge duration and break days
    const challengeDuration =
      differenceInDays(data.endingDate, data.startingDate) + 1;
    const maxBreakDays = Math.floor(challengeDuration * 0.1);

    // If user provided custom break days, validate it's not more than maximum allowed
    const requestedBreakDays = data.totalBreakDays || maxBreakDays;
    if (requestedBreakDays > maxBreakDays) {
      return res.status(400).json({
        error: `Break days cannot exceed ${maxBreakDays} days (10% of challenge duration)`,
      });
    }

    const challenge = await prisma.$transaction(async (tx) => {
      // Create main challenge
      const newChallenge = await tx.challenges.create({
        data: {
          title: data.title,
          type: data.type,
          description: data.description,
          startingDate: data.startingDate,
          endingDate: data.endingDate,
          totalBreakDays: requestedBreakDays,
          remainingBreaks: requestedBreakDays,
          status: "ACTIVE",
          creator: {
            connect: { id: userId },
          },
        },
      });

      // Create platform targets
      const platformTargetPromises = data.platformTargets.map((target: any) =>
        tx.platformTarget.create({
          data: {
            platform: target.platform,
            targetQuestions: target.goal,
            challengeId: newChallenge.id,
          },
        })
      );

      await Promise.all(platformTargetPromises);

      return newChallenge;
    });

    return res.status(201).json({
      message: "Challenge created successfully",
      challenge,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: "Validation error",
        details: error.errors,
      });
    }

    console.error("Challenge creation error:", error);
    return res.status(500).json({
      error: "Failed to create challenge",
    });
  }
};

export const getChallenges = async (req: Request, res: Response) => {
  const challenges = await prisma.challenges.findMany({
    include: {
      creator: true,
    },
  });

  res
    .status(200)
    .json({ message: "Challenges fetched", success: true, challenges });
};

export const updateChallenge = async (req: Request, res: Response) => {
  const challengeId = parseInt(req.params.id);
  const data = req.body;
  const challenge = await prisma.challenges.update({
    where: { id: challengeId },
    data: {
      title: data.title,
      description: data.description,
      type: data.type,
      startingDate: data.startDate,
      endingDate: data.endDate,
    },
  });
  res
    .status(200)
    .json({ message: "Challenge updated", success: true, challenge });
};

export const deleteChallenge = async (req: Request, res: Response) => {
  const challengeId = parseInt(req.params.id);
  const challenge = await prisma.challenges.delete({
    where: { id: challengeId },
  });
  res
    .status(200)
    .json({ message: "Challenge deleted", success: true, challenge });
};
