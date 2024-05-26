/*
  Warnings:

  - Added the required column `updated_at` to the `genre` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `movie` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_genre" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "themoviedb_genre_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_genre" ("id", "themoviedb_genre_id") SELECT "id", "themoviedb_genre_id" FROM "genre";
DROP TABLE "genre";
ALTER TABLE "new_genre" RENAME TO "genre";
CREATE UNIQUE INDEX "genre_themoviedb_genre_id_key" ON "genre"("themoviedb_genre_id");
CREATE TABLE "new_movie" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "cover" TEXT NOT NULL,
    "saved" BOOLEAN NOT NULL,
    "watched" BOOLEAN NOT NULL,
    "themoviedb_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_movie" ("cover", "id", "saved", "themoviedb_id", "title", "watched") SELECT "cover", "id", "saved", "themoviedb_id", "title", "watched" FROM "movie";
DROP TABLE "movie";
ALTER TABLE "new_movie" RENAME TO "movie";
CREATE UNIQUE INDEX "movie_themoviedb_id_key" ON "movie"("themoviedb_id");
PRAGMA foreign_key_check("genre");
PRAGMA foreign_key_check("movie");
PRAGMA foreign_keys=ON;
