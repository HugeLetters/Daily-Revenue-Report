import prisma from "../client.js";

export function upsertDailyInput({
  date,
  DailyMarketSegment,
  DailyFoodservice,
  DailyFoodserviceCover,
  DailyEvent,
  DailyPosting,
  nextMonthsOutlookRooms,
  nextMonthsOutlookRevenue,
  onTheBooksOccupancy,
  ...data
}) {
  console.log({ DailyMarketSegment });
  console.log({ DailyFoodservice });
  console.log({ DailyFoodserviceCover });
  console.log({ DailyPosting });
  console.log({ DailyEvent });
  console.log({ data });
  console.log({ date });

  prisma
    .$transaction([
      prisma.dailyData.upsert({ where: { date }, create: { date, ...data }, update: data }),
      ...Array.from(DailyMarketSegment).map(([segment, value]) =>
        prisma.dailyMarketSegment.upsert({
          where: { id: { date, segment } },
          create: { date, segment, ...value },
          update: { ...value },
        })
      ),
    ])
    .then(data => console.log(data))
    .catch(e => console.error(e));
}
