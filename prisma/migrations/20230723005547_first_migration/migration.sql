-- CreateTable
CREATE TABLE `Accounts` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `profile_image` VARCHAR(191) NULL,
    `last_login` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Accounts_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categories` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `image_path` VARCHAR(191) NULL,
    `deleted_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Exercises` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `cover_image` VARCHAR(191) NULL,
    `category_id` VARCHAR(191) NULL,
    `level` ENUM('BEGINNER', 'INTERMEDIARY', 'ADVANCED') NOT NULL,
    `deleted_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ExercisesImages` (
    `id` VARCHAR(191) NOT NULL,
    `exercise_id` VARCHAR(191) NOT NULL,
    `image_path` VARCHAR(191) NOT NULL,
    `deleted_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ExercisesVideos` (
    `id` VARCHAR(191) NOT NULL,
    `exercise_id` VARCHAR(191) NOT NULL,
    `video_path` VARCHAR(191) NOT NULL,
    `deleted_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Workouts` (
    `id` VARCHAR(191) NOT NULL,
    `account_id` VARCHAR(191) NOT NULL,
    `started` BOOLEAN NOT NULL DEFAULT false,
    `started_at` DATETIME(3) NULL,
    `finished` BOOLEAN NOT NULL DEFAULT false,
    `finished_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WorkoutExercises` (
    `id` VARCHAR(191) NOT NULL,
    `exercise_id` VARCHAR(191) NOT NULL,
    `workout_id` VARCHAR(191) NOT NULL,
    `repetitions` INTEGER NOT NULL,
    `repetitions_qtd` INTEGER NOT NULL,
    `done` BOOLEAN NOT NULL DEFAULT false,
    `done_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Exercises` ADD CONSTRAINT `Exercises_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Categories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExercisesImages` ADD CONSTRAINT `ExercisesImages_exercise_id_fkey` FOREIGN KEY (`exercise_id`) REFERENCES `Exercises`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExercisesVideos` ADD CONSTRAINT `ExercisesVideos_exercise_id_fkey` FOREIGN KEY (`exercise_id`) REFERENCES `Exercises`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Workouts` ADD CONSTRAINT `Workouts_account_id_fkey` FOREIGN KEY (`account_id`) REFERENCES `Accounts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WorkoutExercises` ADD CONSTRAINT `WorkoutExercises_workout_id_fkey` FOREIGN KEY (`workout_id`) REFERENCES `Workouts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WorkoutExercises` ADD CONSTRAINT `WorkoutExercises_exercise_id_fkey` FOREIGN KEY (`exercise_id`) REFERENCES `Exercises`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
