import prisma from "./client.js";

export function getMarketSegments() {
  return prisma.marketSegment.findMany();
}

export function getFoodserviceOutlets() {
  return prisma.foodserviceOutlet.findMany({ select: { subgroup: true, name: true } });
}

export function getFoodservicePostings() {
  return prisma.foodserviceType.findMany({ select: { FoodserviceGroup: true, name: true } });
}

export async function getHotelConfig(name = null) {
  const parseMap = new Map([
    ["INT", value => parseInt(value)],
    ["FLOAT", value => parseFloat(value)],
    ["STRING", value => value],
  ]);
  const query = await prisma.hotelConfig.findFirstOrThrow({ where: { name } });
  return { name: query.name, value: parseMap.get(query.type)(query.value) };
}
