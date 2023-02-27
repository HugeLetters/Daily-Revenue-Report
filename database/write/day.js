import prisma from "../client.js";
const table = prisma.dailyData;

export function upsertDailyInput(data) {
  const {
    date,
    DailyMarketSegment,
    DailyFoodservice,
    DailyFoodserviceCover,
    DailyPosting,
    nextMonthsOutlookRooms,
    nextMonthsOutlookRevenue,
    onTheBooksOccupancy,
    ...DailyData
  } = data;

  DailyData.date = date;

  console.log(DailyMarketSegment);
  console.log(DailyFoodservice);
  console.log(DailyFoodserviceCover);
  console.log(DailyPosting);
  console.log(DailyData);
  console.log(date);

  table
    .upsert({ where: { date }, create: DailyData, update: DailyData })
    .then(data => console.log(data))
    .catch(e => console.error(e));
}
