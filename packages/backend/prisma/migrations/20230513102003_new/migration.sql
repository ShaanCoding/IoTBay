-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_StaffDetails" (
    "userId" TEXT NOT NULL PRIMARY KEY,
    "position" TEXT NOT NULL,
    "isActivated" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "StaffDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("userId") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_StaffDetails" ("isActivated", "position", "userId") SELECT "isActivated", "position", "userId" FROM "StaffDetails";
DROP TABLE "StaffDetails";
ALTER TABLE "new_StaffDetails" RENAME TO "StaffDetails";
CREATE TABLE "new_CustomerDetails" (
    "customerId" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "isAnonymous" BOOLEAN NOT NULL DEFAULT false,
    "sex" TEXT NOT NULL,
    CONSTRAINT "CustomerDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("userId") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_CustomerDetails" ("customerId", "isAnonymous", "sex", "userId") SELECT "customerId", "isAnonymous", "sex", "userId" FROM "CustomerDetails";
DROP TABLE "CustomerDetails";
ALTER TABLE "new_CustomerDetails" RENAME TO "CustomerDetails";
CREATE UNIQUE INDEX "CustomerDetails_userId_key" ON "CustomerDetails"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
