import FieldsetTable from "../../components/FieldsetTable";
import Form from "../../components/Form";
import useNextNMonths from "../../hooks/useNextNMonths";
import { NUMBER_REGEX } from "../../utils/utils";

export default function Rooms() {
  const outlookMonths = useNextNMonths(4);

  return (
    <div>
      <h1>Monthly Rooms Input</h1>
      <Form endpoint="/api/input/financial">
        <FieldsetTable
          legend="Outlook for this month"
          headers={[
            { label: "Rooms Occupied", code: "ROOMS_OCCUPIED", pattern: NUMBER_REGEX.INT },
            { label: "Revenue", pattern: NUMBER_REGEX.FLOAT },
            { label: "Other Revenue", code: "OTHER_REVENUE", pattern: NUMBER_REGEX.FLOAT },
          ]}
          rows={[{ label: "Budget" }, { label: "Forecast" }]}
        />
        <FieldsetTable
          legend={`Outlook for the next ${outlookMonths.length} months`}
          headers={[
            { label: "Forecast Revenue", code: "FORECAST_REVENUE", pattern: NUMBER_REGEX.FLOAT },
            { label: "Forecast Rooms", code: "FORECAST_ROOMS", pattern: NUMBER_REGEX.INT },
            { label: "Budget Revenue", code: "BUDGET_REVENUE", pattern: NUMBER_REGEX.FLOAT },
            { label: "Budget Rooms", code: "BUDGET_ROOMS", pattern: NUMBER_REGEX.INT },
          ]}
          rows={outlookMonths.map((month, i) => ({ label: month, code: i }))}
          flipName
          prefix="Outlook"
        />
      </Form>
    </div>
  );
}
