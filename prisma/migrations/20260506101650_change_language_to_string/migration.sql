/*
  Warnings:

  - Changed the type of `language` on the `Label` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Label" DROP COLUMN "language",
ADD COLUMN     "language" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Language";

-- CreateIndex
CREATE UNIQUE INDEX "Label_projectId_language_key" ON "Label"("projectId", "language");
