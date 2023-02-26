-- CreateEnum
CREATE TYPE "posting-groups" AS ENUM ('ROOM', 'FOODSERVICE', 'MISC', 'PAYMENT', 'PACKAGE', 'TAX', 'ZZZ', 'OTHER');

-- CreateEnum
CREATE TYPE "posting-subgroups" AS ENUM ('BANQUETING', 'CASH', 'CCARD', 'DB', 'INTERNAL', 'INTPAY', 'MISC1', 'MISC2', 'MISC3', 'MISC5', 'MISC6', 'OTHER', 'PACKAGE', 'PAIDOUT', 'NICCOLO', 'MAFFEO', 'ROOM_SERVICE', 'MINI_BAR', 'ROOM', 'TAX1', 'TAX2', 'TAX3', 'TAX4', 'TAX5', 'TAX6', 'TAX7', 'TAX8', 'TAX9', 'TAX10', 'TAX11', 'WRITEOFF', 'ZZZ');

-- CreateEnum
CREATE TYPE "fb-posting-groups" AS ENUM ('BREAKFAST_WALKIN', 'BREAKFAST_INCL', 'FOOD', 'BEVERAGE', 'GRATUITIES', 'OTHER');

-- CreateTable
CREATE TABLE "daily-data" (
    "date" TIMESTAMP(3) NOT NULL,
    "guest-ledger" DOUBLE PRECISION,
    "AR-ledger" DOUBLE PRECISION,
    "deposit-ledger" DOUBLE PRECISION,
    "package-ledger" DOUBLE PRECISION,
    "total-revenue" DOUBLE PRECISION,
    "comp-house-rooms" INTEGER,
    "no-show-rooms" INTEGER,
    "ooo-rooms" INTEGER,
    "arrival-rooms" INTEGER,
    "departure-rooms" INTEGER,
    "guest-in-house" INTEGER,
    "cancellations-today" INTEGER,
    "early-departure-rooms" INTEGER,
    "extended-rooms" INTEGER,
    "walk-in-rooms" INTEGER,
    "tomorrow-arrival-rooms" INTEGER,
    "tomorrow-departure-rooms" INTEGER,
    "enrollments" INTEGER,
    "next-months-outlook-rooms" INTEGER[],
    "next-months-outlook-revenue" DOUBLE PRECISION[],
    "forecast-occpancy" INTEGER[],

    CONSTRAINT "daily-data_pkey" PRIMARY KEY ("date")
);

-- CreateTable
CREATE TABLE "daily-foodservice-data" (
    "date" TIMESTAMP(3) NOT NULL,
    "outlet" "posting-subgroups" NOT NULL,
    "posting" "fb-posting-groups" NOT NULL,

    CONSTRAINT "daily-foodservice-data_pkey" PRIMARY KEY ("date","outlet","posting")
);

-- CreateTable
CREATE TABLE "daily-market-segment-data" (
    "date" TIMESTAMP(3) NOT NULL,
    "segment" CHAR(1) NOT NULL,
    "past-day-rooms" INTEGER NOT NULL,
    "past-day-revenue" DOUBLE PRECISION NOT NULL,
    "rest-of-month-rooms" INTEGER NOT NULL,
    "rest-of-month-revenue" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "daily-market-segment-data_pkey" PRIMARY KEY ("date","segment")
);

-- CreateTable
CREATE TABLE "foodservice-outlets" (
    "subgroup" "posting-subgroups" NOT NULL,
    "group" "posting-groups" NOT NULL DEFAULT 'FOODSERVICE',
    "name" TEXT NOT NULL,

    CONSTRAINT "foodservice-outlets_pkey" PRIMARY KEY ("subgroup")
);

-- CreateTable
CREATE TABLE "market-segments" (
    "code" CHAR(1) NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "market-segments_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "posting-types" (
    "group" "posting-groups" NOT NULL DEFAULT 'OTHER',
    "subgroup" "posting-subgroups" NOT NULL DEFAULT 'OTHER',

    CONSTRAINT "posting-types_pkey" PRIMARY KEY ("group","subgroup")
);

-- CreateTable
CREATE TABLE "fb-posting-types" (
    "group" "posting-groups" NOT NULL,
    "fbgroup" "fb-posting-groups" NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "fb-posting-types_pkey" PRIMARY KEY ("fbgroup")
);

-- CreateTable
CREATE TABLE "posting-codes" (
    "code" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "group" "posting-groups" NOT NULL DEFAULT 'OTHER',
    "subgroup" "posting-subgroups" NOT NULL DEFAULT 'OTHER',
    "fb-group" "fb-posting-groups",
    "tax" INTEGER,
    "tax-code" INTEGER,
    "adj-code" INTEGER,

    CONSTRAINT "posting-codes_pkey" PRIMARY KEY ("code")
);

-- CreateIndex
CREATE UNIQUE INDEX "fb-posting-types_group_fbgroup_key" ON "fb-posting-types"("group", "fbgroup");

-- CreateIndex
CREATE INDEX "posting-codes_code_group_subgroup_fb-group_idx" ON "posting-codes"("code", "group", "subgroup", "fb-group");

-- AddForeignKey
ALTER TABLE "daily-foodservice-data" ADD CONSTRAINT "daily-foodservice-data_date_fkey" FOREIGN KEY ("date") REFERENCES "daily-data"("date") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "daily-foodservice-data" ADD CONSTRAINT "daily-foodservice-data_outlet_fkey" FOREIGN KEY ("outlet") REFERENCES "foodservice-outlets"("subgroup") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "daily-foodservice-data" ADD CONSTRAINT "daily-foodservice-data_posting_fkey" FOREIGN KEY ("posting") REFERENCES "fb-posting-types"("fbgroup") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "daily-market-segment-data" ADD CONSTRAINT "daily-market-segment-data_date_fkey" FOREIGN KEY ("date") REFERENCES "daily-data"("date") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "daily-market-segment-data" ADD CONSTRAINT "daily-market-segment-data_segment_fkey" FOREIGN KEY ("segment") REFERENCES "market-segments"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "foodservice-outlets" ADD CONSTRAINT "foodservice-outlets_group_subgroup_fkey" FOREIGN KEY ("group", "subgroup") REFERENCES "posting-types"("group", "subgroup") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posting-codes" ADD CONSTRAINT "posting-codes_group_subgroup_fkey" FOREIGN KEY ("group", "subgroup") REFERENCES "posting-types"("group", "subgroup") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posting-codes" ADD CONSTRAINT "posting-codes_fb-group_group_fkey" FOREIGN KEY ("fb-group", "group") REFERENCES "fb-posting-types"("fbgroup", "group") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posting-codes" ADD CONSTRAINT "posting-codes_tax-code_fkey" FOREIGN KEY ("tax-code") REFERENCES "posting-codes"("code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posting-codes" ADD CONSTRAINT "posting-codes_adj-code_fkey" FOREIGN KEY ("adj-code") REFERENCES "posting-codes"("code") ON DELETE SET NULL ON UPDATE CASCADE;
