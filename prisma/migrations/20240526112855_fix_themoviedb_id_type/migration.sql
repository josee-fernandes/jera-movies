/*
  Warnings:

  - You are about to alter the column `themoviedb_id` on the `movie` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_movie" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "cover" TEXT NOT NULL,
    "saved" BOOLEAN NOT NULL,
    "watched" BOOLEAN NOT NULL,
    "themoviedb_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_movie" ("cover", "created_at", "id", "saved", "themoviedb_id", "title", "updated_at", "watched") SELECT "cover", "created_at", "id", "saved", "themoviedb_id", "title", "updated_at", "watched" FROM "movie";
DROP TABLE "movie";
ALTER TABLE "new_movie" RENAME TO "movie";
CREATE UNIQUE INDEX "movie_themoviedb_id_key" ON "movie"("themoviedb_id");
PRAGMA foreign_key_check("movie");
PRAGMA foreign_keys=ON;
