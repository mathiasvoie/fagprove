/*
  Warnings:

  - A unique constraint covering the columns `[id,folderId]` on the table `Tools` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Tools_id_folderId_key" ON "Tools"("id", "folderId");
