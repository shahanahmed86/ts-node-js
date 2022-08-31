/*
  Warnings:

  - You are about to drop the column `isEnded` on the `AdminSession` table. All the data in the column will be lost.
  - Added the required column `endsAt` to the `AdminSession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `AdminSession` DROP COLUMN `isEnded`,
    ADD COLUMN `endsAt` DATETIME(3) NOT NULL;
