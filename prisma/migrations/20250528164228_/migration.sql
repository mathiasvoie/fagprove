-- DropForeignKey
ALTER TABLE "Tools" DROP CONSTRAINT "Tools_imageId_fkey";

-- AddForeignKey
ALTER TABLE "Tools" ADD CONSTRAINT "Tools_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Images"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tools" ADD CONSTRAINT "Tools_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
