import moment from "moment";
import { useSelector } from "./reduxHooks";

export default function useNextNMonths(n: Number) {
  if (!(n > 0)) throw "Invalid amount of months requested";
  const date = useSelector(state => state.date);
  return Array(n)
    .fill(0)
    .map((_, i) =>
      moment(date)
        .date(1)
        .add(i + 1, "M")
        .format("DD.MM.YYYY")
    );
}
