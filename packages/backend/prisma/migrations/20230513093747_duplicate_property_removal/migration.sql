/*
  Warnings:

  - You are about to drop the column `address` on the `StaffDetails` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `StaffDetails` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_StaffDetails" (
    "userId" TEXT NOT NULL PRIMARY KEY,
    "position" TEXT NOT NULL,
    "isActivated" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "StaffDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_StaffDetails" ("isActivated", "position", "userId") SELECT "isActivated", "position", "userId" FROM "StaffDetails";
DROP TABLE "StaffDetails";
ALTER TABLE "new_StaffDetails" RENAME TO "StaffDetails";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
