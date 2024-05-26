/*
  Warnings:

  - The required column `id` was added to the `profile_movie` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `movie_genre` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_profile_movie" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "profile_id" TEXT NOT NULL,
    "movie_id" TEXT NOT NULL,
    CONSTRAINT "profile_movie_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profile" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "profile_movie_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movie" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_profile_movie" ("movie_id", "profile_id") SELECT "movie_id", "profile_id" FROM "profile_movie";
DROP TABLE "profile_movie";
ALTER TABLE "new_profile_movie" RENAME TO "profile_movie";
CREATE TABLE "new_movie_genre" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "movie_id" TEXT NOT NULL,
    "genre_id" TEXT NOT NULL,
    CONSTRAINT "movie_genre_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movie" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "movie_genre_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "genre" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_movie_genre" ("genre_id", "movie_id") SELECT "genre_id", "movie_id" FROM "movie_genre";
DROP TABLE "movie_genre";
ALTER TABLE "new_movie_genre" RENAME TO "movie_genre";
PRAGMA foreign_key_check("profile_movie");
PRAGMA foreign_key_check("movie_genre");
PRAGMA foreign_keys=ON;
