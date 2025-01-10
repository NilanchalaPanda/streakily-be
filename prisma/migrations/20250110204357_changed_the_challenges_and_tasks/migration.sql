/*
  Warnings:

  - A unique constraint covering the columns `[challengeId,date]` on the table `Tasks` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "BREAK_STATUS" AS ENUM ('SCHEDULED', 'TAKEN', 'CANCELLED');

-- AlterTable
ALTER TABLE "Challenges" ADD COLUMN     "remainingBreaks" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalBreakDays" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Tasks" ADD COLUMN     "isBreakDay" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "points" SET DEFAULT 0;

-- CreateTable
CREATE TABLE "PlatformTarget" (
    "id" SERIAL NOT NULL,
    "platform" TEXT NOT NULL,
    "targetQuestions" INTEGER NOT NULL,
    "solvedQuestions" INTEGER NOT NULL DEFAULT 0,
    "challengeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlatformTarget_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PlatformTarget_challengeId_idx" ON "PlatformTarget"("challengeId");

-- CreateIndex
CREATE UNIQUE INDEX "PlatformTarget_challengeId_platform_key" ON "PlatformTarget"("challengeId", "platform");

-- CreateIndex
CREATE UNIQUE INDEX "Tasks_challengeId_date_key" ON "Tasks"("challengeId", "date");

-- AddForeignKey
ALTER TABLE "PlatformTarget" ADD CONSTRAINT "PlatformTarget_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenges"("id") ON DELETE CASCADE ON UPDATE CASCADE;
