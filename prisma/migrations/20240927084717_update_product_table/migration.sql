/*
  Warnings:

  - You are about to alter the column `type` on the `product` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.

*/
-- AlterTable
ALTER TABLE `product` MODIFY `productName` VARCHAR(255) NOT NULL,
    MODIFY `ProductDescription` TEXT NULL,
    MODIFY `type` VARCHAR(50) NOT NULL,
    MODIFY `ownerName` VARCHAR(255) NOT NULL,
    MODIFY `review` INTEGER NULL,
    MODIFY `imageURL` VARCHAR(255) NULL;
