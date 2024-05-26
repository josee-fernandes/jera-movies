-- CreateTable
CREATE TABLE "movie_category" (
    "movie_id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    CONSTRAINT "movie_category_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movie" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "movie_category_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "category_id" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "movie_category_movie_id_key" ON "movie_category"("movie_id");

-- CreateIndex
CREATE UNIQUE INDEX "movie_category_category_id_key" ON "movie_category"("category_id");

-- CreateIndex
CREATE UNIQUE INDEX "category_category_id_key" ON "category"("category_id");
