/*
  Warnings:

  - You are about to drop the column `genre_id` on the `genre` table. All the data in the column will be lost.
  - Added the required column `themoviedb_genre_id` to the `genre` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_genre" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "themoviedb_genre_id" TEXT NOT NULL
);
INSERT INTO "new_genre" ("id") SELECT "id" FROM "genre";
DROP TABLE "genre";
ALTER TABLE "new_genre" RENAME TO "genre";
CREATE UNIQUE INDEX "genre_themoviedb_genre_id_key" ON "genre"("themoviedb_genre_id");
PRAGMA foreign_key_check("genre");
PRAGMA foreign_keys=ON;
