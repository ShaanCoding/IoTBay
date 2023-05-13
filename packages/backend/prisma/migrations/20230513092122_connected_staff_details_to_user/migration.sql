-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_StaffDetails" (
    "userId" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "isActivated" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "StaffDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_StaffDetails" ("address", "isActivated", "name", "position", "userId") SELECT "address", "isActivated", "name", "position", "userId" FROM "StaffDetails";
DROP TABLE "StaffDetails";
ALTER TABLE "new_StaffDetails" RENAME TO "StaffDetails";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
