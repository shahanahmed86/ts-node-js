-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_deletedById_fkey`;

-- AlterTable
ALTER TABLE `User` MODIFY `deletedById` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_deletedById_fkey` FOREIGN KEY (`deletedById`) REFERENCES `Admin`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
