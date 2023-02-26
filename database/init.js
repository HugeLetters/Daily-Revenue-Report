import prisma from "./client.js";
import XLSX from "xlsx";

const sheetName = "Transaction Postings";
const workbook = XLSX.readFile("./dev-assets/DRR/Daily Revenue Report Master Light.xlsm", {
  sheets: sheetName,
});
const worksheet = workbook.Sheets[sheetName];

await prisma.postingCode.deleteMany();
await prisma.marketSegment.deleteMany();
await prisma.foodserviceType.deleteMany();
await prisma.foodserviceOutlet.deleteMany();
await prisma.postingType.deleteMany();
await prisma.hotelConfig.deleteMany();

// # HOTEL CONFIG

{
  const data = [
    { name: "Hotel Name", type: "STRING", value: "Soluxe Hotel Moscow" },
    { name: "Months Outlook Count", type: "INT", value: "4" },
    { name: "Events Daily Limit", type: "INT", value: "15" },
    { name: "Total Rooms", type: "INT", value: "340" },
    { name: "Days Outlook Count", type: "INT", value: "31" },
  ];

  await prisma.hotelConfig.createMany({ data });
}

// # MARKET SEGMENTS

{
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

  await prisma.marketSegment.createMany({ data });
}

// # POSTING TYPES

{
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
  const data = XLSX.utils.sheet_to_json(worksheet).map(({ Group: group, Subgroup: type }) => ({
    group: groupMap[group] ?? group ?? "OTHER",
    subgroup: typeMap[type] ?? type ?? "OTHER",
  }));

  await prisma.postingType.createMany({ data, skipDuplicates: true });
}

// # F&B POSTING TYPES

{
  const data = [
    ["BREAKFAST_WALKIN", "Breakfast Walk-in"],
    ["BREAKFAST_INCL", "Breakfast incl."],
    ["FOOD", "Food"],
    ["BEVERAGE", "Beverage"],
    ["GRATUITIES", "Gratuities"],
    ["OTHER", "Other"],
  ];

  await prisma.foodserviceType.createMany({
    data: data.map(([FoodserviceGroup, name]) => ({
      group: "FOODSERVICE",
      FoodserviceGroup,
      name,
    })),
  });
}

// # FOODSERVICE OUTLETS
{
  const nameMap = {
    BANQUETING: "Banqueting",
    NICCOLO: "Niccolo",
    MAFFEO: "Maffeo",
    ROOM_SERVICE: "Room Service",
    MINI_BAR: "Mini-bar",
    OTHER: "Other",
  };

  const data = await prisma.postingType.findMany({
    where: { group: "FOODSERVICE" },
    select: { group: true, subgroup: true },
  });

  await prisma.foodserviceOutlet.createMany({
    data: data.map(x => ({ ...x, name: nameMap[x.subgroup] })),
  });
}

// # POSTING CODES

{
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
  const data = XLSX.utils
    .sheet_to_json(worksheet)
    .map(
      ({
        Code: code,
        Name: name,
        Group: group,
        Subgroup: subgroup,
        "F&B Type": FoodserviceGroup,
        "Tax Type": tax,
        "Tax Code": taxCode,
        "Adj Code": adjCode,
      }) => ({
        code,
        name,
        group: groupMap[group] ?? group,
        subgroup: subgroupMap[subgroup] ?? subgroup,
        FoodserviceGroup: FBMap[FoodserviceGroup] ?? FoodserviceGroup,
        tax,
        taxCode,
        adjCode,
      })
    );

  const table = prisma.postingCode;
  await table.createMany({ data });
  await table.updateMany({
    where: { group: "FOODSERVICE", FoodserviceGroup: null },
    data: { FoodserviceGroup: "OTHER" },
  });
}
