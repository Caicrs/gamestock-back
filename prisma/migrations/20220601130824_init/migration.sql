/*
  Warnings:

  - You are about to drop the `Games` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Generos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Games";

-- DropTable
DROP TABLE "Generos";

-- CreateTable
CREATE TABLE "games" (
    "id" TEXT NOT NULL,
    "Title" TEXT NOT NULL,
    "CoverImageUrl" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "Year" INTEGER NOT NULL,
    "ImdbScore" INTEGER NOT NULL,
    "TrailerYouTubeUrl" TEXT NOT NULL,
    "GameplayYouTubeUrl" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "games_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "generos" (
    "id" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "generos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "Cpf" TEXT NOT NULL,
    "IsAdmin" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profile" (
    "id" TEXT NOT NULL,
    "Title" TEXT NOT NULL,
    "ImageUrl" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profile_games" (
    "id" TEXT NOT NULL,
    "profile_id" TEXT,
    "games_id" TEXT,

    CONSTRAINT "profile_games_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "generos_games" (
    "id" TEXT NOT NULL,
    "profile_id" TEXT,
    "games_id" TEXT,

    CONSTRAINT "generos_games_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_Email_key" ON "user"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "profile_games_profile_id_games_id_key" ON "profile_games"("profile_id", "games_id");

-- CreateIndex
CREATE UNIQUE INDEX "generos_games_profile_id_games_id_key" ON "generos_games"("profile_id", "games_id");

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile_games" ADD CONSTRAINT "profile_games_games_id_fkey" FOREIGN KEY ("games_id") REFERENCES "games"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile_games" ADD CONSTRAINT "profile_games_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "generos_games" ADD CONSTRAINT "generos_games_games_id_fkey" FOREIGN KEY ("games_id") REFERENCES "games"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "generos_games" ADD CONSTRAINT "generos_games_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "generos"("id") ON DELETE SET NULL ON UPDATE CASCADE;
