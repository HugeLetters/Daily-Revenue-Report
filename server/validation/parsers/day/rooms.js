export function parseDayliRoomsInput(data) {
  return Object.entries(data).reduce(
    (obj, [k, v]) => {
      const [type, ...args] = k.split(" ");
      parserMap.get(type)?.(obj, v, ...args);
      return obj;
    },
    {
      DailyMarketSegment: {},
      nextMonthsOutlookRooms: [],
      nextMonthsOutlookRevenue: [],
      onTheBooksOccupancy: [],
    }
  );
}

const parserMap = new Map([
  ["date", (obj, v) => (obj["date"] = v)],
  ["GUEST_LEDGER", (obj, v) => (obj["guestLedger"] = v)],
  ["AR_LEDGER", (obj, v) => (obj["ARLedger"] = v)],
  ["DEPOSIT_LEDGER", (obj, v) => (obj["depositLedger"] = v)],
  ["PACKAGE_LEDGER", (obj, v) => (obj["packageLedger"] = v)],
  [
    "PAST_DAY_ROOMS",
    (obj, v, segment) => {
      obj["DailyMarketSegment"][segment]
        ? (obj["DailyMarketSegment"][segment]["pastDayRooms"] = v)
        : (obj["DailyMarketSegment"][segment] = { pastDayRooms: v });
    },
  ],
  [
    "PAST_DAY_REVENUE",
    (obj, v, segment) => {
      obj["DailyMarketSegment"][segment]
        ? (obj["DailyMarketSegment"][segment]["pastDayRevenue"] = v)
        : (obj["DailyMarketSegment"][segment] = { pastDayRevenue: v });
    },
  ],
  [
    "REST_OF_MONTH_ROOMS",
    (obj, v, segment) => {
      obj["DailyMarketSegment"][segment]
        ? (obj["DailyMarketSegment"][segment]["restOfMonthRooms"] = v)
        : (obj["DailyMarketSegment"][segment] = { restOfMonthRooms: v });
    },
  ],
  [
    "REST_OF_MONTH_REVENUE",
    (obj, v, segment) => {
      obj["DailyMarketSegment"][segment]
        ? (obj["DailyMarketSegment"][segment]["restOfMonthRevenue"] = v)
        : (obj["DailyMarketSegment"][segment] = { restOfMonthRevenue: v });
    },
  ],
  ["TOTAL_REVENUE", (obj, v) => (obj["totalRevenue"] = v)],
  ["COMP_HOUSE_ROOMS", (obj, v) => (obj["compHouseRooms"] = v)],
  ["NO_SHOW_ROOMS", (obj, v) => (obj["noShowRooms"] = v)],
  ["OOO_ROOMS", (obj, v) => (obj["OOORooms"] = v)],
  ["ARRIVAL_ROOMS", (obj, v) => (obj["arrivalRooms"] = v)],
  ["DEPARTURE_ROOMS", (obj, v) => (obj["departureRooms"] = v)],
  ["GUEST_IN_HOUSE", (obj, v) => (obj["guestInHouse"] = v)],
  ["CANCELLATIONS_TODAY", (obj, v) => (obj["cancellationsToday"] = v)],
  ["EARLY_DEPARTURE_ROOMS", (obj, v) => (obj["earlyDepartureRooms"] = v)],
  ["EXTENDED_ROOMS", (obj, v) => (obj["extendedRooms"] = v)],
  ["WALK_IN_ROOMS", (obj, v) => (obj["walkInRooms"] = v)],
  ["TOMORROW_ARRIVAL_ROOMS", (obj, v) => (obj["tomorrowArrivalRooms"] = v)],
  ["TOMORROW_DEPARTURE_ROOMS", (obj, v) => (obj["tomorrowDepartureRooms"] = v)],
  ["ENROLLMENTS", (obj, v) => (obj["enrollments"] = v)],
  [
    "OUTLOOK",
    (obj, v, arg1, arg2) =>
      arg1 === "ROOMS"
        ? obj["nextMonthsOutlookRooms"].push({ month: arg2, value: v })
        : obj["nextMonthsOutlookRevenue"].push({ month: arg2, value: v }),
  ],
  ["OTB", (obj, v, arg) => obj["onTheBooksOccupancy"].push({ day: arg, value: v })],
]);
