/*
  Warnings:

  - You are about to alter the column `token` on the `AdminSession` table. The data in that column could be lost. The data in that column will be cast from `VarChar(600)` to `VarChar(250)`.

*/
-- AlterTable
ALTER TABLE `AdminSession` MODIFY `token` VARCHAR(250) NOT NULL;
