/*
  Warnings:

  - You are about to drop the `RecentlySearched` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "RecentlySearched";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "RecentSearch" (
    "recentlySearchId" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "search" TEXT NOT NULL,
    CONSTRAINT "RecentSearch_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "RecentSearch_userId_key" ON "RecentSearch"("userId");
