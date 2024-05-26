/*
  Warnings:

  - You are about to alter the column `themoviedb_genre_id` on the `genre` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_genre" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "themoviedb_genre_id" INTEGER NOT NULL
);
INSERT INTO "new_genre" ("id", "themoviedb_genre_id") SELECT "id", "themoviedb_genre_id" FROM "genre";
DROP TABLE "genre";
ALTER TABLE "new_genre" RENAME TO "genre";
CREATE UNIQUE INDEX "genre_themoviedb_genre_id_key" ON "genre"("themoviedb_genre_id");
PRAGMA foreign_key_check("genre");
PRAGMA foreign_keys=ON;
