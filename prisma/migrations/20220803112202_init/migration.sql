-- DropForeignKey
ALTER TABLE `SignUp` DROP FOREIGN KEY `SignUp_deletedById_fkey`;

-- AlterTable
ALTER TABLE `SignUp` MODIFY `deletedById` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `SignUp` ADD CONSTRAINT `SignUp_deletedById_fkey` FOREIGN KEY (`deletedById`) REFERENCES `Admin`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
