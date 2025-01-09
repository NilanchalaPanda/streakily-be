/*
  Warnings:

  - You are about to drop the column `behanceHandle` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `linkedinHandle` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `personalSite` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `twitterHandle` on the `Profile` table. All the data in the column will be lost.
  - Made the column `bio` on table `Profile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "behanceHandle",
DROP COLUMN "linkedinHandle",
DROP COLUMN "personalSite",
DROP COLUMN "twitterHandle",
ADD COLUMN     "socials" JSONB,
ALTER COLUMN "bio" SET NOT NULL;
