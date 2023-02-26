import flatpickr from "flatpickr";
import { useSelector } from "./reduxHooks";

export default function useNextNDays(n: Number) {
  if (!(n > 0)) throw "Invalid amount of days requested";
  const date = useSelector(state => state.date);
  const dateObj = flatpickr.parseDate(date.value, date.format) ?? new Date();
  return Array(n)
    .fill(0)
    .map((_, i) => {
      return flatpickr.formatDate(dateObj.fp_incr(i), date.format);
    });
}

declare global {
  interface Date {
    fp_incr(incr: number): Date;
  }
}
