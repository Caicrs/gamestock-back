-- CreateTable
CREATE TABLE "Games" (
    "id" TEXT NOT NULL,
    "Title" TEXT NOT NULL,
    "CoverImageUrl" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "Year" INTEGER NOT NULL,
    "ImdbScore" INTEGER NOT NULL,
    "TrailerYouTubeUrl" TEXT NOT NULL,
    "GameplayYouTubeUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Games_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Generos" (
    "id" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Generos_pkey" PRIMARY KEY ("id")
);
