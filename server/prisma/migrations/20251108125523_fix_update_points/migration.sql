/*
  Warnings:

  - You are about to drop the column `description` on the `UpdatePoint` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `UpdatePoint` table. All the data in the column will be lost.
  - Added the required column `contents` to the `UpdatePoint` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UpdatePoint" DROP COLUMN "description",
DROP COLUMN "title",
ADD COLUMN     "contents" TEXT NOT NULL;
