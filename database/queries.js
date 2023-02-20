import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export function getMarketSegments() {
  return prisma.marketSegment.findMany();
}

export function getFoodServiceOutlets() {
  return prisma.foodserviceOutlet.findMany({ select: { subgroup: true, name: true } });
}

export function getFoodServicePostings() {
  return prisma.fBpostingType.findMany({ select: { fbgroup: true, name: true } });
}
