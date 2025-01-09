import { prisma } from "../index";

export const updateAccounts = async (
  userId: number,
  accountType: "github" | "leetcode" | "codeforces",
  accountData: { username: string; isVerified: boolean }
) => {
  try {
    // Prepare the structured data
    const accountJson = {
      ...accountData,
      updatedAt: new Date(), // Automatically set the updated timestamp
    };

    console.log("heelo there - in update accounts");

    // Use upsert to create or update the account entry
    const updatedAccount = await prisma.accounts.upsert({
      where: { userId },
      create: {
        userId,
        [accountType]: accountJson,
      },
      update: {
        [accountType]: accountJson,
      },
    });

    console.log("heelo there - in update accounts");

    return updatedAccount;
  } catch (error) {
    throw new Error("Error updating account: " + (error as Error).message);
  }
};
