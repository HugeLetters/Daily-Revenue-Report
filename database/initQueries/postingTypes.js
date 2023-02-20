const groupMap = {
  "F&B": "FOODSERVICE",
  PAY: "PAYMENT",
  PKG: "PACKAGE",
};
const typeMap = {
  BQT: "BANQUETING",
  OTH: "OTHER",
  "INT-PAY": "INTPAY",
  PKG: "PACKAGE",
  PO: "PAIDOUT",
  R01: "NICCOLO",
  R02: "MAFFEO",
  R13: "ROOM_SERVICE",
  R14: "MINI_BAR",
  RM: "ROOM",
};
import XLSX from "xlsx";

const sheetName = "Transaction Postings";

const workbook = XLSX.readFile("./dev-assets/DRR/Daily Revenue Report Master Light.xlsm", {
  sheets: sheetName,
});
const worksheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(worksheet).map(({ Group: group, Subgroup: type }) => ({
  group: groupMap[group] ?? group ?? "OTHER",
  subgroup: typeMap[type] ?? type ?? "OTHER",
}));

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const table = prisma.postingType;

table.deleteMany().then();
table.createMany({ data, skipDuplicates: true }).then();
