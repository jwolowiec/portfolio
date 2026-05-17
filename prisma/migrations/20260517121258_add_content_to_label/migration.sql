/*
  Warnings:

  - Added the required column `content` to the `Label` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Label" ADD COLUMN     "content" TEXT NOT NULL;
