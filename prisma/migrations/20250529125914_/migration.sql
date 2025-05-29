-- DropIndex
DROP INDEX "Tools_name_key";

-- AlterTable
ALTER TABLE "Tools" ADD COLUMN     "quanity" INTEGER NOT NULL DEFAULT 1;
