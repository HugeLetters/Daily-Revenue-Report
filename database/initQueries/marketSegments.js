import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const table = prisma.marketSegment;

const data = [
  ["Corporate Meeting / Groups", "C"],
  ["Advance Purchase", "D"],
  ["International Companies (RFP)", "E"],
  ["Corporate Groups Accommodation only", "F"],
  ["Best Flex", "G"],
  ["Chinese Corporate Groups", "I"],
  ["Weekend Packages", "J"],
  ["Local Negotiated + Government Individual (excl Chinese)", "L"],
  ["Airline", "O"],
  ["Chinese Corp Individuals (incl Government)", "P"],
  ["Government Group", "Q"],
  ["OTA", "R"],
  ["Sport Groups", "S"],
  ["Tour Series", "T"],
  ["Leisure Group", "U"],
  ["Family and Friends", "V"],
  ["Wholesale", "W"],
  ["Advanced through BTAs", "X"],
  ["Long Stays", "Y"],
  ["Catering", "Z"],
  ["House Use", "H"],
  ["Complimentary", "N"],
].map(([description, code]) => ({ description, code }));

table.deleteMany({ where: {} }).then();
table.createMany({ data }).then();
