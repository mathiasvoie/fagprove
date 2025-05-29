/*
  Warnings:

  - You are about to drop the column `quanity` on the `Tools` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Tools" DROP COLUMN "quanity",
ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 1;
