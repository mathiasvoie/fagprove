/*
  Warnings:

  - Added the required column `extension` to the `Images` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `Images` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Images" ADD COLUMN     "extension" TEXT NOT NULL,
ADD COLUMN     "size" INTEGER NOT NULL;
