/*
  Warnings:

  - You are about to drop the column `token` on the `bearer` table. All the data in the column will be lost.
  - Added the required column `bearer` to the `bearer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `bearer` DROP COLUMN `token`,
    ADD COLUMN `bearer` VARCHAR(191) NOT NULL;
