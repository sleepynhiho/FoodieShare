/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `username` on table `User` required. This step will fail if there are existing NULL values in that column.

*/

-- First, update existing NULL usernames with generated unique usernames
UPDATE "public"."User" 
SET "username" = 'user_' || SUBSTRING(id, 1, 8)
WHERE "username" IS NULL;

-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "username" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "public"."User"("username");
