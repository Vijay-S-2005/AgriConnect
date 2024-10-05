/*
  Warnings:

  - Added the required column `type` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `type` ENUM('user', 'admin', 'farmer') NOT NULL,
    MODIFY `firstName` VARCHAR(255) NOT NULL,
    MODIFY `lastName` VARCHAR(255) NOT NULL,
    MODIFY `password` VARCHAR(255) NOT NULL,
    MODIFY `phoneNumber` VARCHAR(255) NOT NULL;
