import { Request, Response } from "express";
import { challengeSchema } from "../schema/challenges.schema";
import { prisma } from "..";

export const createChallenge = async (req: Request, res: Response) => {
  challengeSchema.parse(req.body);

  const data = req.body;

  const challenge = await prisma.challenges.create({
    data: {
      title: data.title,
      description: data.description,
      type: data.type,
      startingDate: data.startDate,
      endingDate: data.endDate,
      creator: {
        connect: { id: data.userId },
      },
    },
  });
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
