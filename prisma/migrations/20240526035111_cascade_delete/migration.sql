-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_profile_movie" (
    "profile_id" TEXT NOT NULL,
    "movie_id" TEXT NOT NULL,
    CONSTRAINT "profile_movie_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profile" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "profile_movie_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movie" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_profile_movie" ("movie_id", "profile_id") SELECT "movie_id", "profile_id" FROM "profile_movie";
DROP TABLE "profile_movie";
ALTER TABLE "new_profile_movie" RENAME TO "profile_movie";
CREATE UNIQUE INDEX "profile_movie_profile_id_key" ON "profile_movie"("profile_id");
CREATE UNIQUE INDEX "profile_movie_movie_id_key" ON "profile_movie"("movie_id");
CREATE TABLE "new_profile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "avatar_url" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_profile" ("avatar_url", "created_at", "id", "name", "updated_at", "user_id") SELECT "avatar_url", "created_at", "id", "name", "updated_at", "user_id" FROM "profile";
DROP TABLE "profile";
ALTER TABLE "new_profile" RENAME TO "profile";
CREATE UNIQUE INDEX "profile_user_id_key" ON "profile"("user_id");
PRAGMA foreign_key_check("profile_movie");
PRAGMA foreign_key_check("profile");
PRAGMA foreign_keys=ON;
