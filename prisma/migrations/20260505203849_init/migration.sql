-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'SAVED', 'DELETED');

-- CreateEnum
CREATE TYPE "Language" AS ENUM ('ENG', 'PL');

-- CreateTable
CREATE TABLE "Project" (
    "id" UUID NOT NULL,
    "url" TEXT NOT NULL,
    "imageId" UUID,
    "technologies" TEXT[],

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" UUID NOT NULL,
    "path" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Label" (
    "id" UUID NOT NULL,
    "projectId" UUID NOT NULL,
    "slug" TEXT NOT NULL,
    "language" "Language" NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "characteristics" TEXT[],

    CONSTRAINT "Label_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_imageId_key" ON "Project"("imageId");

-- CreateIndex
CREATE UNIQUE INDEX "Label_projectId_language_key" ON "Label"("projectId", "language");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Label" ADD CONSTRAINT "Label_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
