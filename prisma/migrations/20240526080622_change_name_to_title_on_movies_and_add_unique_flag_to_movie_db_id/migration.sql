/*
  Warnings:

  - You are about to drop the column `name` on the `movie` table. All the data in the column will be lost.
  - Added the required column `title` to the `movie` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_movie" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "cover" TEXT NOT NULL,
    "saved" BOOLEAN NOT NULL,
    "watched" BOOLEAN NOT NULL,
    "themoviedb_id" TEXT NOT NULL
);
INSERT INTO "new_movie" ("cover", "id", "saved", "themoviedb_id", "watched") SELECT "cover", "id", "saved", "themoviedb_id", "watched" FROM "movie";
DROP TABLE "movie";
ALTER TABLE "new_movie" RENAME TO "movie";
CREATE UNIQUE INDEX "movie_themoviedb_id_key" ON "movie"("themoviedb_id");
PRAGMA foreign_key_check("movie");
PRAGMA foreign_keys=ON;
