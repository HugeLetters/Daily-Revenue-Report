-- CreateEnum
CREATE TYPE "posting-group" AS ENUM ('ROOM', 'FOODSERVICE', 'MISC', 'PAYMENT', 'PACKAGE', 'TAX', 'ZZZ', 'OTHER');

-- CreateEnum
CREATE TYPE "posting-type" AS ENUM ('BANQUETING', 'CASH', 'CCARD', 'DB', 'INTERNAL', 'INTPAY', 'MISC1', 'MISC2', 'MISC3', 'MISC5', 'MISC6', 'OTHER', 'PACKAGE', 'PAIDOUT', 'NICCOLO', 'MAFFEO', 'ROOM_SERVICE', 'MINI_BAR', 'ROOM', 'TAX1', 'TAX2', 'TAX3', 'TAX4', 'TAX5', 'TAX6', 'TAX7', 'TAX8', 'TAX9', 'TAX10', 'TAX11', 'WRITEOFF', 'ZZZ');

-- CreateEnum
CREATE TYPE "fb-posting-type" AS ENUM ('BREAKFAST_WALKIN', 'BREAKFAST_INCL', 'FOOD', 'BEVERAGE', 'GRATUITIES');

-- CreateTable
CREATE TABLE "posting-codes" (
    "code" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "group" "posting-group" NOT NULL DEFAULT 'OTHER',
    "type" "posting-type" NOT NULL DEFAULT 'OTHER',
    "fb-type" "fb-posting-type",
    "tax" INTEGER,
    "tax-code" INTEGER,
    "adj-code" INTEGER,

    CONSTRAINT "posting-codes_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "market-segments" (
    "code" CHAR(1) NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "market-segments_pkey" PRIMARY KEY ("code")
);

-- AddForeignKey
ALTER TABLE "posting-codes" ADD CONSTRAINT "posting-codes_tax-code_fkey" FOREIGN KEY ("tax-code") REFERENCES "posting-codes"("code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posting-codes" ADD CONSTRAINT "posting-codes_adj-code_fkey" FOREIGN KEY ("adj-code") REFERENCES "posting-codes"("code") ON DELETE SET NULL ON UPDATE CASCADE;
