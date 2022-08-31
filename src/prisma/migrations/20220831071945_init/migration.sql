/*
  Warnings:

  - A unique constraint covering the columns `[adminId]` on the table `AdminSession` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `AdminSession_adminId_key` ON `AdminSession`(`adminId`);
