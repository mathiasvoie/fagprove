-- AddForeignKey
ALTER TABLE "Tools" ADD CONSTRAINT "Tools_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Folders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
