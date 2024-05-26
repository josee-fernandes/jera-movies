/*
  Warnings:

  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `movie_category` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "category";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "movie_category";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "movie_genre" (
    "movie_id" TEXT NOT NULL,
    "genre_id" TEXT NOT NULL,
    CONSTRAINT "movie_genre_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movie" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "movie_genre_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "genre" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "genre" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "genre_id" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "movie_genre_movie_id_key" ON "movie_genre"("movie_id");

-- CreateIndex
CREATE UNIQUE INDEX "movie_genre_genre_id_key" ON "movie_genre"("genre_id");

-- CreateIndex
CREATE UNIQUE INDEX "genre_genre_id_key" ON "genre"("genre_id");
