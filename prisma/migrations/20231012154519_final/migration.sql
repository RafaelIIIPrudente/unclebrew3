-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productName" TEXT NOT NULL,
    "image" TEXT,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "price" REAL NOT NULL DEFAULT 0,
    "description" TEXT,
    "inventoryId" TEXT NOT NULL
);
INSERT INTO "new_Product" ("description", "id", "image", "inventoryId", "price", "productName", "quantity") SELECT "description", "id", "image", "inventoryId", "price", "productName", "quantity" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_productName_key" ON "Product"("productName");
CREATE INDEX "inventoryId" ON "Product"("inventoryId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
