import flatpickr from "flatpickr";
import { useSelector } from "./reduxHooks";

export default function useNextNMonths(n: Number) {
  if (!(n > 0)) throw "Invalid amount of months requested";
  const date = useSelector(state => state.date);
  const dateObj = flatpickr.parseDate(date.value, date.format) ?? new Date();
  dateObj.setDate(1);
  return Array(n)
    .fill(0)
    .map((_, i) => {
      const nextDate = new Date(dateObj);
      nextDate.setMonth(nextDate.getMonth() + i + 1);
      return flatpickr.formatDate(nextDate, date.format);
    });
}
