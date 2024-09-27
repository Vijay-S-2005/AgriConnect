/*
  Warnings:

  - You are about to alter the column `type` on the `product` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `product` MODIFY `type` ENUM('Vegetable', 'Fruit', 'Grain', 'Millet') NOT NULL;
