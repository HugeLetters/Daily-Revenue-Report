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
      DailyFoodservice: [],
      DailyFoodserviceCover: [],
      DailyEvent: [],
    }
  );
}

const parserMap = new Map([
  ["date", (obj, v) => (obj["date"] = v)],
  [
    "EVENTS_NAME",
    (obj, v, arg) =>
      obj["DailyEvent"][arg]
        ? (obj["DailyEvent"][arg].name = v)
        : (obj["DailyEvent"][arg] = { name: v }),
  ],
  [
    "EVENTS_COMPANY",
    (obj, v, arg) =>
      obj["DailyEvent"][arg]
        ? (obj["DailyEvent"][arg].company = v)
        : (obj["DailyEvent"][arg] = { company: v }),
  ],
  [
    "EVENTS_ROOM_NIGHTS",
    (obj, v, arg) =>
      obj["DailyEvent"][arg]
        ? (obj["DailyEvent"][arg].roomnights = v)
        : (obj["DailyEvent"][arg] = { roomnights: v }),
  ],
  [
    "EVENTS_CHECK_IN",
    (obj, v, arg) =>
      obj["DailyEvent"][arg]
        ? (obj["DailyEvent"][arg].checkin = v)
        : (obj["DailyEvent"][arg] = { checkin: v }),
  ],
  [
    "EVENTS_CHECK_OUT",
    (obj, v, arg) =>
      obj["DailyEvent"][arg]
        ? (obj["DailyEvent"][arg].checkout = v)
        : (obj["DailyEvent"][arg] = { checkout: v }),
  ],
  [
    "EVENTS_STATUS",
    (obj, v, arg) =>
      obj["DailyEvent"][arg]
        ? (obj["DailyEvent"][arg].status = v)
        : (obj["DailyEvent"][arg] = { status: v }),
  ],
  [
    "FOODSERVICE_CORRECTION",
    (obj, v, arg) =>
      arg === "OPERA"
        ? (obj["foodserviceCorrectionOpera"] = v)
        : (obj["foodserviceCorrectionSimphony"] = v),
  ],
]);
