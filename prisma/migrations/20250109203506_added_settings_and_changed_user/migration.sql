/*
  Warnings:

  - You are about to alter the column `title` on the `Challenges` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `type` on the `Challenges` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `collegeName` on the `Profile` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `currCompany` on the `Profile` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to drop the column `avatarUrl` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `longestStreaks` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `totalPoints` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ROLE" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "RANK" AS ENUM ('NEWBIE', 'AMATEUR', 'PRO', 'EXPERT', 'MASTER', 'LEGEND');

-- CreateEnum
CREATE TYPE "THEME" AS ENUM ('LIGHT', 'DARK', 'SYSTEM');

-- CreateEnum
CREATE TYPE "LANGUAGE" AS ENUM ('ENGLISH', 'SPANISH', 'FRENCH', 'GERMAN', 'CHINESE', 'JAPANESE');

-- DropForeignKey
ALTER TABLE "Accounts" DROP CONSTRAINT "Accounts_userId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropForeignKey
ALTER TABLE "Tasks" DROP CONSTRAINT "Tasks_challengeId_fkey";

-- AlterTable
ALTER TABLE "Accounts" ADD COLUMN     "GeekForGeek" JSONB,
ADD COLUMN     "atCoder" JSONB,
ADD COLUMN     "codeChef" JSONB,
ADD COLUMN     "hankerRank" JSONB;

-- AlterTable
ALTER TABLE "Challenges" ALTER COLUMN "title" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "type" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "avatarUrl" TEXT,
ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "longestStreaks" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "rank" "RANK" NOT NULL DEFAULT 'NEWBIE',
ADD COLUMN     "role" "ROLE" NOT NULL DEFAULT 'USER',
ADD COLUMN     "totalPoints" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "collegeName" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "currCompany" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "User" DROP COLUMN "avatarUrl",
DROP COLUMN "isVerified",
DROP COLUMN "longestStreaks",
DROP COLUMN "totalPoints";

-- CreateTable
CREATE TABLE "Settings" (
    "id" SERIAL NOT NULL,
    "isProfilePrivate" BOOLEAN NOT NULL DEFAULT false,
    "showOnLeaderboard" BOOLEAN NOT NULL DEFAULT true,
    "emailNotifications" BOOLEAN NOT NULL DEFAULT true,
    "pushNotifications" BOOLEAN NOT NULL DEFAULT true,
    "challengeReminders" BOOLEAN NOT NULL DEFAULT true,
    "weeklyDigest" BOOLEAN NOT NULL DEFAULT true,
    "theme" "THEME" NOT NULL DEFAULT 'SYSTEM',
    "language" "LANGUAGE" NOT NULL DEFAULT 'ENGLISH',
    "timezone" TEXT NOT NULL DEFAULT 'UTC',
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Settings_userId_key" ON "Settings"("userId");

-- CreateIndex
CREATE INDEX "Settings_userId_idx" ON "Settings"("userId");

-- CreateIndex
CREATE INDEX "Accounts_userId_idx" ON "Accounts"("userId");

-- CreateIndex
CREATE INDEX "Challenges_userId_idx" ON "Challenges"("userId");

-- CreateIndex
CREATE INDEX "Challenges_status_idx" ON "Challenges"("status");

-- CreateIndex
CREATE INDEX "Challenges_startingDate_endingDate_idx" ON "Challenges"("startingDate", "endingDate");

-- CreateIndex
CREATE INDEX "Profile_userId_idx" ON "Profile"("userId");

-- CreateIndex
CREATE INDEX "Tasks_challengeId_idx" ON "Tasks"("challengeId");

-- CreateIndex
CREATE INDEX "Tasks_status_idx" ON "Tasks"("status");

-- CreateIndex
CREATE INDEX "Tasks_date_idx" ON "Tasks"("date");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_userName_idx" ON "User"("userName");

-- AddForeignKey
ALTER TABLE "Accounts" ADD CONSTRAINT "Accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Settings" ADD CONSTRAINT "Settings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenges"("id") ON DELETE CASCADE ON UPDATE CASCADE;
