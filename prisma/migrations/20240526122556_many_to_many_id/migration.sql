/*
  Warnings:

  - The primary key for the `profile_movie` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `profile_movie` table. All the data in the column will be lost.
  - The primary key for the `movie_genre` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `movie_genre` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_profile_movie" (
    "profile_id" TEXT NOT NULL,
    "movie_id" TEXT NOT NULL,

    PRIMARY KEY ("profile_id", "movie_id"),
    CONSTRAINT "profile_movie_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profile" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "profile_movie_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movie" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_profile_movie" ("movie_id", "profile_id") SELECT "movie_id", "profile_id" FROM "profile_movie";
DROP TABLE "profile_movie";
ALTER TABLE "new_profile_movie" RENAME TO "profile_movie";
CREATE TABLE "new_movie_genre" (
    "movie_id" TEXT NOT NULL,
    "genre_id" TEXT NOT NULL,

    PRIMARY KEY ("movie_id", "genre_id"),
    CONSTRAINT "movie_genre_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movie" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "movie_genre_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "genre" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_movie_genre" ("genre_id", "movie_id") SELECT "genre_id", "movie_id" FROM "movie_genre";
DROP TABLE "movie_genre";
ALTER TABLE "new_movie_genre" RENAME TO "movie_genre";
PRAGMA foreign_key_check("profile_movie");
PRAGMA foreign_key_check("movie_genre");
PRAGMA foreign_keys=ON;
