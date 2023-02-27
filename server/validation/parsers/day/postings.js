export function parseDayliPostingsInput(data) {
  return Object.entries(data).reduce(
    (obj, [k, v]) => {
      if (v instanceof Array) {
        v = v[0];
      }
      if (k === "date") {
        obj["date"] = v;
      } else {
        obj["DailyPosting"].push({ code: k, value: v });
      }
      return obj;
    },
    {
      DailyPosting: [],
    }
  );
}
