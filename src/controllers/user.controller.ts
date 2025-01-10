import { Request, Response } from "express";
import { prisma } from "..";
import { BadRequestsException } from "../expceptions/bad-request";
import { ErrorCode } from "../expceptions/root";
import { NotFoundException } from "../expceptions/not-found";

export const addProfileDetails = async (req: Request, res: Response) => {
  const data = req.body;
  const userId = parseInt(req.params.userId);

  let user = await prisma.user.findFirst({
    where: { id: userId },
  });

  if (!user) {
    new BadRequestsException("User not found", ErrorCode.USER_NOT_FOUND);
  }

  try {
    const profile = await prisma.profile.create({
      data: {
        bio: data.bio,
        socials: data.socials,
        collegeName: data.collegeName,
        isAlumni: data.isAlumni,
        currCompany: data.currCompany,
        avatarUrl: data.avatarUrl,
        isVerified: data.isVerified,
        user: {
          connect: { id: userId },
        },
      },
    });

    res.status(200).json({ message: "Profile updated", sucess: true });
  } catch (err) {
    new BadRequestsException(
      "Error creating profile",
      ErrorCode.INTERNAL_EXCEPTION
    );
  }
};

export const updateProfileDetails = async (req: Request, res: Response) => {
  const data = req.body;
  const userId = parseInt(req.params.userId);

  let user = await prisma.user.findFirst({
    where: { id: userId },
  });

  if (!user) {
    new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);
  }

  try {
    const profile = await prisma.profile.update({
      where: { userId: userId },
      data: {
        bio: data.bio,
        socials: data.socials,
        collegeName: data.collegeName,
        isAlumni: data.isAlumni,
        currCompany: data.currCompany,
        avatarUrl: data.avatarUrl,
        isVerified: data.isVerified,
      },
    });

    res
      .status(200)
      .json({ message: "Profile updated", success: true, profile });
  } catch (err) {
    new BadRequestsException(
      "Error updating profile",
      ErrorCode.INTERNAL_EXCEPTION
    );
  }
};
