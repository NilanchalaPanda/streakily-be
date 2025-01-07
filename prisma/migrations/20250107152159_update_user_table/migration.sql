/*
  Warnings:

  - You are about to drop the column `longestSteaks` on the `User` table. All the data in the column will be lost.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Accounts" ALTER COLUMN "github" DROP NOT NULL,
ALTER COLUMN "codeforces" DROP NOT NULL,
ALTER COLUMN "leetcode" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "longestSteaks",
ADD COLUMN     "longestStreaks" INTEGER DEFAULT 0,
ADD COLUMN     "password" TEXT NOT NULL;
