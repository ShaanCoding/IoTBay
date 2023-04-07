/*
  Warnings:

  - You are about to drop the `Customer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Staff` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `customerId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `customerId` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `customerId` on the `Shipment` table. All the data in the column will be lost.
  - You are about to drop the column `customerId` on the `OrderLineItem` table. All the data in the column will be lost.
  - You are about to drop the column `history` on the `RecentlySearched` table. All the data in the column will be lost.
  - You are about to drop the column `customerId` on the `Payment` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Shipment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `OrderLineItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `search` to the `RecentlySearched` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Customer_userId_key";

-- DropIndex
DROP INDEX "Staff_userId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Customer";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Staff";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "CustomerDetails" (
    "customerId" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "isAnonymous" BOOLEAN NOT NULL DEFAULT false,
    "sex" TEXT NOT NULL,
    CONSTRAINT "CustomerDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "orderId" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "total" REAL NOT NULL,
    "userId" TEXT NOT NULL,
    "paymentId" TEXT NOT NULL,
    "shipmentId" TEXT,
    "invoiceId" TEXT,
    CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Order_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice" ("invoiceId") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("date", "invoiceId", "orderId", "paymentId", "shipmentId", "total") SELECT "date", "invoiceId", "orderId", "paymentId", "shipmentId", "total" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
CREATE TABLE "new_Invoice" (
    "invoiceId" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "total" REAL NOT NULL,
    "userId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    CONSTRAINT "Invoice_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Invoice" ("date", "invoiceId", "orderId", "total") SELECT "date", "invoiceId", "orderId", "total" FROM "Invoice";
DROP TABLE "Invoice";
ALTER TABLE "new_Invoice" RENAME TO "Invoice";
CREATE TABLE "new_Shipment" (
    "shipmentId" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "address" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Shipment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("orderId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Shipment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Shipment" ("address", "date", "orderId", "shipmentId") SELECT "address", "date", "orderId", "shipmentId" FROM "Shipment";
DROP TABLE "Shipment";
ALTER TABLE "new_Shipment" RENAME TO "Shipment";
CREATE UNIQUE INDEX "Shipment_orderId_key" ON "Shipment"("orderId");
CREATE TABLE "new_OrderLineItem" (
    "orderLineItemId" TEXT NOT NULL PRIMARY KEY,
    "orderId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "OrderLineItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("orderId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OrderLineItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("productId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OrderLineItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_OrderLineItem" ("orderId", "orderLineItemId", "productId", "quantity") SELECT "orderId", "orderLineItemId", "productId", "quantity" FROM "OrderLineItem";
DROP TABLE "OrderLineItem";
ALTER TABLE "new_OrderLineItem" RENAME TO "OrderLineItem";
CREATE TABLE "new_RecentlySearched" (
    "recentlySearchedId" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "search" TEXT NOT NULL,
    CONSTRAINT "RecentlySearched_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_RecentlySearched" ("recentlySearchedId", "userId") SELECT "recentlySearchedId", "userId" FROM "RecentlySearched";
DROP TABLE "RecentlySearched";
ALTER TABLE "new_RecentlySearched" RENAME TO "RecentlySearched";
CREATE UNIQUE INDEX "RecentlySearched_userId_key" ON "RecentlySearched"("userId");
CREATE TABLE "new_Payment" (
    "paymentId" TEXT NOT NULL PRIMARY KEY,
    "success" BOOLEAN NOT NULL,
    "orderId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Payment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("orderId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Payment" ("orderId", "paymentId", "success") SELECT "orderId", "paymentId", "success" FROM "Payment";
DROP TABLE "Payment";
ALTER TABLE "new_Payment" RENAME TO "Payment";
CREATE UNIQUE INDEX "Payment_orderId_key" ON "Payment"("orderId");
CREATE TABLE "new_User" (
    "userId" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "dob" DATETIME,
    "userType" TEXT NOT NULL DEFAULT 'customer',
    "shippingAddress" TEXT,
    "billingAddress" TEXT
);
INSERT INTO "new_User" ("billingAddress", "email", "password", "shippingAddress", "userId", "userType") SELECT "billingAddress", "email", "password", "shippingAddress", "userId", "userType" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "CustomerDetails_userId_key" ON "CustomerDetails"("userId");
