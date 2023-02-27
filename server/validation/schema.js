import { z } from "zod";

const zInt = z.coerce.number().int();
const zFloat = z.coerce.number().finite();

export const dateSchema = z.coerce.date();

export const dailyInputSchema = z
  .object({
    date: z.date(),
    guestLedger: zFloat,
    ARLedger: zFloat,
    depositLedger: zFloat,
    packageLedger: zFloat,
    DailyMarketSegment: z.record(
      z.string().length(1),
      z
        .object({
          pastDayRooms: zInt,
          pastDayRevenue: zFloat,
          restOfMonthRooms: zInt,
          restOfMonthRevenue: zFloat,
        })
        .partial()
    ),
    totalRevenue: zFloat,
    compHouseRooms: zInt,
    noShowRooms: zInt,
    OOORooms: zInt,
    arrivalRooms: zInt,
    departureRooms: zInt,
    guestInHouse: zInt,
    cancellationsToday: zInt,
    earlyDepartureRooms: zInt,
    extendedRooms: zInt,
    walkInRooms: zInt,
    tomorrowArrivalRooms: zInt,
    tomorrowDepartureRooms: zInt,
    enrollments: zInt,
    nextMonthsOutlookRooms: z
      .array(z.object({ month: z.coerce.number().nonnegative().int().lte(24), value: zInt }))
      .max(24),
    nextMonthsOutlookRevenue: z
      .array(z.object({ month: z.coerce.number().nonnegative().int().lte(24), value: zFloat }))
      .max(24),
    onTheBooksOccupancy: z
      .array(z.object({ day: z.coerce.number().nonnegative().int().lt(180), value: zInt }))
      .max(180),
    DailyFoodservice: z
      .array(z.object({ outlet: z.string().max(50), posting: z.string().max(50), value: zFloat }))
      .max(50),
    DailyFoodserviceCover: z.array(z.object({ outlet: z.string().max(50), value: zInt })).max(50),
    foodserviceCorrectionOpera: zFloat,
    foodserviceCorrectionSimphony: zFloat,
    eventsName: z.array(z.string().max(200)).max(100),
    eventsCompany: z.array(z.string().max(200)).max(100),
    eventsRoomnights: z.array(zInt).max(100),
    eventsCheckIn: z.array(z.coerce.date()).max(100),
    eventsCheckOut: z.array(z.coerce.date()).max(100),
    eventsStatus: z.array(z.string().max(200)).max(100),
    DailyPosting: z.array(z.object({ code: zInt.gte(0).lte(9999), value: zFloat })).max(10000),
  })
  .partial()
  .required({ date: true });
