/*
  Warnings:

  - You are about to drop the column `isScheduled` on the `AdminSession` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `AdminSession` DROP COLUMN `isScheduled`,
    ADD COLUMN `isPublished` BOOLEAN NOT NULL DEFAULT false;
