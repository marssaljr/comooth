-- CreateTable
CREATE TABLE `bearer` (
    `id` VARCHAR(191) NOT NULL,
    `bearer` VARCHAR(191) NOT NULL,
    `expiresIn` INTEGER NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `bearer_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `bearer` ADD CONSTRAINT `bearer_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
