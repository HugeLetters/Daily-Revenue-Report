import Error from "../../components/Error";
import Loading from "../../components/Loading";
import useFetchData from "../../hooks/useFetchData";
import useNextNMonths from "../../hooks/useNextNMonths";
import Fieldset from "../../components/Fieldset";
import FieldsetTable from "../../components/FieldsetTable";
import Form from "../../components/Form";
import { useSelector } from "../../hooks/reduxHooks";
import flatpickr from "flatpickr";
import useNextNDays from "../../hooks/useNextNDays";
import { NUMBER_REGEX } from "../../utils/utils";

export default function Rooms() {
  const segments = useFetchData({
    endpoint: "/api/hotel/market-segments",
    key: ["market segments"],
  });
  const date = useSelector(state => state.date);
  const today = flatpickr.parseDate(date.value, date.format) ?? new Date();
  const todayMonth = today.getMonth();
  const tomorrowMonth = today.fp_incr(1).getMonth();
  const outlookMonths = useNextNMonths(todayMonth !== tomorrowMonth ? 5 : 4);
  const forecastDates = useNextNDays(32);

  return (
    <div>
      <h1>Daily Rooms Input</h1>
      <Form endpoint="/api/input/day">
        <Fieldset
          legend="Trial Balance"
          fields={["Guest", "AR", "Deposit", "Package"].map(field => ({
            label: field + " Ledger",
            pattern: NUMBER_REGEX.FLOAT,
          }))}
        />
        {segments.isLoading && <Loading text="Market Segments are being loaded from the server" />}
        {segments.isError && <Error errorText={segments.error} />}
        {segments.isSuccess && (
          <FieldsetTable
            legend="Market Segmentation"
            headers={[
              { label: "Past Day Revenue", code: "PAST_DAY_REVENUE", pattern: NUMBER_REGEX.FLOAT },
              { label: "Past Day Rooms", code: "PAST_DAY_ROOMS", pattern: NUMBER_REGEX.INT },
              {
                label: "Rest of Month Revenue",
                code: "REST_OF_MONTH_REVENUE",
                pattern: NUMBER_REGEX.FLOAT,
              },
              {
                label: "Rest of Month Rooms",
                code: "REST_OF_MONTH_ROOMS",
                pattern: NUMBER_REGEX.INT,
              },
            ]}
            rows={segments.data}
            flipName
            showRowCodes
          />
        )}
        <Fieldset
          legend="Manager Flash"
          fields={[
            { label: "Total Revenue", code: "TOTAL_REVENUE", pattern: NUMBER_REGEX.FLOAT },
            {
              label: "Comp. & House-Use Rooms",
              code: "COMP_HOUSE_ROOMS",
              pattern: NUMBER_REGEX.INT,
            },
            { label: "No-Show Rooms", code: "NO_SHOW_ROOMS", pattern: NUMBER_REGEX.INT },
            { label: "Out of Order Rooms", code: "OOO_ROOMS", pattern: NUMBER_REGEX.INT },
            { label: "Arrival Rooms", code: "ARRIVAL_ROOMS", pattern: NUMBER_REGEX.INT },
            { label: "Departure Rooms", code: "DEPARTURE_ROOMS", pattern: NUMBER_REGEX.INT },
            { label: "Guest in House", code: "GUEST_IN_HOUSE", pattern: NUMBER_REGEX.INT },
            {
              label: "Cancellations for Today",
              code: "CANCELLATIONS_TODAY",
              pattern: NUMBER_REGEX.INT,
            },
            {
              label: "Early Departure Rooms",
              code: "EARLY_DEPARTURE_ROOMS",
              pattern: NUMBER_REGEX.INT,
            },
            { label: "Extended Stay Rooms", code: "EXTENDED_ROOMS", pattern: NUMBER_REGEX.INT },
            { label: "Walk-in Rooms", code: "WALK_IN_ROOMS", pattern: NUMBER_REGEX.INT },
            {
              label: "Tomorrow Arrival Rooms",
              code: "TOMORROW_ARRIVAL_ROOMS",
              pattern: NUMBER_REGEX.INT,
            },
            {
              label: "Tomorrow Departure Rooms",
              code: "TOMORROW_DEPARTURE_ROOMS",
              pattern: NUMBER_REGEX.INT,
            },
            { label: "Enrollments", code: "ENROLLMENTS", pattern: NUMBER_REGEX.INT },
          ]}
        />
        <FieldsetTable
          legend="Outlook"
          headers={[
            { label: "Revenue", pattern: NUMBER_REGEX.FLOAT },
            { label: "Rooms", pattern: NUMBER_REGEX.INT },
          ]}
          rows={outlookMonths.map((month, i) => ({ label: month, code: i }))}
          flipName
          prefix="Outlook"
        />
        <Fieldset
          legend="Expected Occupancy"
          prefix="Expected"
          fields={forecastDates.map((date, i) => ({
            label: date,
            pattern: NUMBER_REGEX.INT,
            code: i,
          }))}
        />
      </Form>
    </div>
  );
}
