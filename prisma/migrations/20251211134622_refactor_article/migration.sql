/*
  Warnings:

  - You are about to drop the column `content` on the `Article` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Article" DROP COLUMN "content",
ADD COLUMN     "conclusion" TEXT NOT NULL DEFAULT '...',
ADD COLUMN     "introduction" TEXT NOT NULL DEFAULT '...',
ADD COLUMN     "proTip" TEXT NOT NULL DEFAULT '...',
ALTER COLUMN "title" SET DEFAULT '...';
