-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "category" VARCHAR(50),

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);
