-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CustomerDetails" (
    "userId" TEXT NOT NULL PRIMARY KEY,
    "isAnonymous" BOOLEAN NOT NULL DEFAULT false,
    "sex" TEXT,
    CONSTRAINT "CustomerDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("userId") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_CustomerDetails" ("isAnonymous", "sex", "userId") SELECT "isAnonymous", "sex", "userId" FROM "CustomerDetails";
DROP TABLE "CustomerDetails";
ALTER TABLE "new_CustomerDetails" RENAME TO "CustomerDetails";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
