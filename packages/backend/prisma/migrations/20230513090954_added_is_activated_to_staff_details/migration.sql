-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_StaffDetails" (
    "userId" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "isActivated" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_StaffDetails" ("address", "name", "position", "userId") SELECT "address", "name", "position", "userId" FROM "StaffDetails";
DROP TABLE "StaffDetails";
ALTER TABLE "new_StaffDetails" RENAME TO "StaffDetails";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
