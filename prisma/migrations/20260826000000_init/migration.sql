-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `hashedPassword` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL DEFAULT 'Admin',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AboutPage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `homeHeading` VARCHAR(191) NOT NULL DEFAULT 'Built on conviction, *delivered with care.*',
    `heading` VARCHAR(191) NOT NULL DEFAULT 'Strategy first, *design for impact.*',
    `intro` TEXT NOT NULL,
    `intro2` TEXT NULL,
    `mission` TEXT NOT NULL,
    `vision` TEXT NOT NULL,
    `vision2` TEXT NULL,
    `story` TEXT NOT NULL,
    `bannerImage` VARCHAR(191) NOT NULL DEFAULT '/images/projects/abay-bank/lobby-2.jpg',
    `aboutImage` VARCHAR(191) NOT NULL DEFAULT '/images/projects/africa-cdc/headquarters.jpg',
    `hoverImage` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ApproachItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `icon` VARCHAR(191) NOT NULL DEFAULT 'fas fa-compass',
    `link` VARCHAR(191) NOT NULL DEFAULT '/about',
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProjectCategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL DEFAULT '',
    `sortOrder` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `ProjectCategory_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GalleryImage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `client` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NULL,
    `image` VARCHAR(191) NOT NULL,
    `alt` VARCHAR(191) NOT NULL DEFAULT '',
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `categoryId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WorkProcessStep` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `stepNumber` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SiteSettings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `siteName` VARCHAR(191) NOT NULL DEFAULT 'Harla Design',
    `contactPhone` VARCHAR(191) NOT NULL DEFAULT '+971 523 797 567',
    `contactEmail` VARCHAR(191) NOT NULL DEFAULT 'contact@harladesign.com',
    `contactAddress` VARCHAR(191) NOT NULL DEFAULT 'SS Tower, 63rd Street',
    `contactAddress2` VARCHAR(191) NOT NULL DEFAULT 'Al Barsha South 3, Dubai UAE',
    `footerText1` VARCHAR(191) NOT NULL DEFAULT 'Have a project in mind? Let''s build something *remarkable* together.',
    `footerText2` VARCHAR(191) NOT NULL DEFAULT 'Get in touch — we''re ready when you are.',
    `copyrightText` VARCHAR(191) NOT NULL DEFAULT '',
    `socialInstagram` VARCHAR(191) NOT NULL DEFAULT 'https://www.instagram.com/harla_designs',
    `socialSpotify` VARCHAR(191) NOT NULL DEFAULT 'https://open.spotify.com/show/033jiFuYnZa19SQaeDLVtX',
    `socialSubstack` VARCHAR(191) NOT NULL DEFAULT 'https://beneatheconcrete.substack.com',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContactSubmission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `organisation` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `message` TEXT NOT NULL,
    `isRead` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `GalleryImage` ADD CONSTRAINT `GalleryImage_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `ProjectCategory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

