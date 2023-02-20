const groupMap = {
  "F&B": "FOODSERVICE",
};
const fbgroupMap = {
  BFW: "BREAKFAST_WALKIN",
  BFI: "BREAKFAST_INCL",
  F: "FOOD",
  B: "BEVERAGE",
  G: "GRATUITIES",
  O: "OTHER",
};
import XLSX from "xlsx";

const sheetName = "Transaction Postings";

const workbook = XLSX.readFile("./dev-assets/DRR/Daily Revenue Report Master Light.xlsm", {
  sheets: sheetName,
});
const worksheet = workbook.Sheets[sheetName];
const data = XLSX.utils
  .sheet_to_json(worksheet)
  .filter(({ Group }) => Group === "F&B")
  .map(({ Group: group, "F&B Type": fbgroup }) => ({
    group: groupMap[group],
    fbgroup: fbgroupMap[fbgroup] ?? "OTHER",
  }));

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const table = prisma.fBpostingType;

table.deleteMany().then();
table.createMany({ data, skipDuplicates: true }).then();
