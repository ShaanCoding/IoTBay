-- CreateTable
CREATE TABLE "User" (
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

-- CreateTable
CREATE TABLE "CustomerDetails" (
    "userId" TEXT NOT NULL PRIMARY KEY,
    "isAnonymous" BOOLEAN NOT NULL DEFAULT false,
    "sex" TEXT,
    CONSTRAINT "CustomerDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("userId") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "StaffDetails" (
    "userId" TEXT NOT NULL PRIMARY KEY,
    "position" TEXT NOT NULL,
    "isActivated" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "StaffDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("userId") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CouponsAndDiscounts" (
    "couponId" TEXT NOT NULL PRIMARY KEY,
    "isUsed" BOOLEAN NOT NULL DEFAULT false,
    "couponCode" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "CouponsAndDiscounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RecentSearch" (
    "recentlySearchId" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "search" TEXT NOT NULL,
    CONSTRAINT "RecentSearch_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Product" (
    "productId" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "stock" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "category" TEXT,
    "lastUpdated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Product_category_fkey" FOREIGN KEY ("category") REFERENCES "ProductCategory" ("name") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Order" (
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

-- CreateTable
CREATE TABLE "Payment" (
    "paymentId" TEXT NOT NULL PRIMARY KEY,
    "success" BOOLEAN NOT NULL,
    "orderId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Payment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("orderId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Shipment" (
    "shipmentId" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "address" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Shipment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("orderId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Shipment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Invoice" (
    "invoiceId" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "total" REAL NOT NULL,
    "userId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    CONSTRAINT "Invoice_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "OrderLineItem" (
    "orderLineItemId" TEXT NOT NULL PRIMARY KEY,
    "orderId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "OrderLineItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("orderId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OrderLineItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("productId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OrderLineItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProductCategory" (
    "name" TEXT NOT NULL PRIMARY KEY
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_orderId_key" ON "Payment"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "Shipment_orderId_key" ON "Shipment"("orderId");
