const groupMap = {
  "F&B": "FOODSERVICE",
  PAY: "PAYMENT",
  PKG: "PACKAGE",
};
const subgroupMap = {
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
const FBMap = {
  BFW: "BREAKFAST_WALKIN",
  BFI: "BREAKFAST_INCL",
  F: "FOOD",
  B: "BEVERAGE",
  G: "GRATUITIES",
};
import XLSX from "xlsx";

const sheetName = "Transaction Postings";

const workbook = XLSX.readFile("./dev-assets/DRR/Daily Revenue Report Master Light.xlsm", {
  sheets: sheetName,
});
const worksheet = workbook.Sheets[sheetName];
const data = XLSX.utils
  .sheet_to_json(worksheet)
  .map(
    ({
      Code: code,
      Name: name,
      Group: group,
      Subgroup: subgroup,
      "F&B Type": FBgroup,
      "Tax Type": tax,
      "Tax Code": taxCode,
      "Adj Code": adjCode,
    }) => ({
      code,
      name,
      group: groupMap[group] ?? group,
      subgroup: subgroupMap[subgroup] ?? subgroup,
      FBgroup: FBMap[FBgroup] ?? FBgroup,
      tax,
      taxCode,
      adjCode,
    })
  );

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const table = prisma.postingCode;

await table.deleteMany({ where: {} });
await table.createMany({ data });
await table.updateMany({
  where: { group: "FOODSERVICE", FBgroup: null },
  data: { FBgroup: "OTHER" },
});
