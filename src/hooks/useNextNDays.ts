import moment from "moment";
import { useSelector } from "./reduxHooks";

export default function useNextNDays(n: Number) {
  if (!(n > 0)) throw "Invalid amount of days requested";
  const date = useSelector(state => state.date);
  return Array(n)
    .fill(0)
    .map((_, i) => moment(date).add(i, "d").format("DD.MM.YYYY"));
}
