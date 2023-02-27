import useFetchData from "../../hooks/useFetchData";
import useNextNMonths from "../../hooks/useNextNMonths";
import Fieldset from "../../components/Fieldset";
import FieldsetTable from "../../components/FieldsetTable";
import Form from "../../components/Form";
import { useSelector } from "../../hooks/reduxHooks";
import useNextNDays from "../../hooks/useNextNDays";
import { NUMBER_REGEX } from "../../utils/utils";
import FetchingElement from "../../components/FetchingElement";
import moment from "moment";

export default function Rooms() {
  const segments = useFetchData({
    endpoint: "/api/hotel/market-segments",
    key: ["market segments"],
  });
  const monthsOutlookCount = useFetchData({
    endpoint: "/api/hotel/config",
    key: ["outlook months"],
    params: { name: "outlook_months" },
  });
  const daysOutlookCount = useFetchData({
    endpoint: "/api/hotel/config",
    key: ["outlook days"],
    params: { name: "outlook_days" },
  });

  const date = useSelector(state => state.date);
  const isEndOfMonth = moment(date).month() !== moment(date).add(1, "d").month();

  const outlookMonths = useNextNMonths(
    monthsOutlookCount.isSuccess
      ? isEndOfMonth
        ? monthsOutlookCount.data.value + 1
        : monthsOutlookCount.data.value
      : 1
  );
  const outlookDays = useNextNDays(
    daysOutlookCount.isSuccess ? daysOutlookCount.data.value + 1 : 1
  );

  return (
    <div>
      <h1>Daily Rooms Input</h1>
      <Form endpoint="/api/input/day/rooms">
        <Fieldset
          legend="Trial Balance"
          fields={["Guest", "AR", "Deposit", "Package"].map(field => ({
            label: field + " Ledger",
            code: field.toUpperCase() + "_LEDGER",
            pattern: NUMBER_REGEX.FLOAT,
          }))}
        />
        <FetchingElement
          queries={[segments]}
          label="Market Segments data"
        >
          <FieldsetTable
            legend="Market Segmentation"
            headers={[
              {
                label: "Past Day Revenue",
                code: "PAST_DAY_REVENUE",
                pattern: NUMBER_REGEX.FLOAT,
              },
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
        </FetchingElement>
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
        <FetchingElement
          label="Outlook Months"
          queries={[monthsOutlookCount]}
        >
          <FieldsetTable
            legend="Outlook"
            headers={[
              { label: "Revenue", code: "REVENUE", pattern: NUMBER_REGEX.FLOAT },
              { label: "Rooms", code: "ROOMS", pattern: NUMBER_REGEX.INT },
            ]}
            rows={outlookMonths.map((month, i) => ({ label: month, code: i }))}
            flipName
            prefix="OUTLOOK"
          />
        </FetchingElement>
        <FetchingElement
          label="Outlook days"
          queries={[daysOutlookCount]}
        >
          <Fieldset
            legend="On the Books Occupancy"
            prefix="OTB"
            fields={outlookDays.map((date, i) => ({
              label: date,
              pattern: NUMBER_REGEX.INT,
              code: i,
            }))}
          />
        </FetchingElement>
      </Form>
    </div>
  );
}
