export function parseDayliFoodserviceInput(data) {
  return Object.entries(data).reduce(
    (obj, [k, v]) => {
      const [type, ...args] = k.split(" ");
      (
        parserMap.get(type) ??
        ((obj, v, arg) =>
          arg === "COVERS"
            ? obj["DailyFoodserviceCover"].push({ outlet: type, value: v })
            : obj["DailyFoodservice"].push({ outlet: type, posting: arg, value: v }))
      )(obj, v, ...args);
      return obj;
    },
    {
      eventsName: [],
      eventsCompany: [],
      eventsRoomnights: [],
      eventsCheckIn: [],
      eventsCheckOut: [],
      eventsStatus: [],
      DailyFoodservice: [],
      DailyFoodserviceCover: [],
    }
  );
}

const parserMap = new Map([
  ["date", (obj, v) => (obj["date"] = v)],
  ["EVENTS_NAME", (obj, v, arg) => (obj["eventsName"][arg] = v)],
  ["EVENTS_COMPANY", (obj, v, arg) => (obj["eventsCompany"][arg] = v)],
  ["EVENTS_ROOM_NIGHTS", (obj, v, arg) => (obj["eventsRoomnights"][arg] = v)],
  ["EVENTS_CHECK_IN", (obj, v, arg) => (obj["eventsCheckIn"][arg] = v)],
  ["EVENTS_CHECK_OUT", (obj, v, arg) => (obj["eventsCheckOut"][arg] = v)],
  ["EVENTS_STATUS", (obj, v, arg) => (obj["eventsStatus"][arg] = v)],
  [
    "FOODSERVICE_CORRECTION",
    (obj, v, arg) =>
      arg === "OPERA"
        ? (obj["foodserviceCorrectionOpera"] = v)
        : (obj["foodserviceCorrectionSimphony"] = v),
  ],
]);
