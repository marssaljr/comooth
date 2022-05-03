/*
  Warnings:

  - You are about to drop the column `bearer` on the `bearer` table. All the data in the column will be lost.
  - Added the required column `token` to the `bearer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `bearer` DROP COLUMN `bearer`,
    ADD COLUMN `token` VARCHAR(191) NOT NULL;
