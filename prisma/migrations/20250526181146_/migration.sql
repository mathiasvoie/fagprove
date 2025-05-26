-- CreateTable
CREATE TABLE "Images" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Images_name_key" ON "Images"("name");

-- AddForeignKey
ALTER TABLE "Folders" ADD CONSTRAINT "Folders_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Images"("id") ON DELETE SET NULL ON UPDATE CASCADE;
