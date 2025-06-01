/*
  Warnings:

  - You are about to drop the column `imageId` on the `Folders` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Folders" DROP CONSTRAINT "Folders_imageId_fkey";

-- AlterTable
ALTER TABLE "Folders" DROP COLUMN "imageId";
