import FetchingElement from "../../components/FetchingElement";
import Fieldset from "../../components/Fieldset";
import FieldsetTable from "../../components/FieldsetTable";
import Form from "../../components/Form";
import useFetchData from "../../hooks/useFetchData";
import useNextNMonths from "../../hooks/useNextNMonths";
import { NUMBER_REGEX } from "../../utils/utils";

export default function Rooms() {
  const monthsOutlookCount = useFetchData({
    endpoint: "/api/hotel/config",
    key: ["outlook months"],
    params: { name: "outlook_months" },
  });
  const outlookMonths = useNextNMonths(
    monthsOutlookCount.isSuccess ? monthsOutlookCount.data.value : 1
  );

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
        <FetchingElement
          label="Outlook Months"
          queries={[monthsOutlookCount]}
        >
          <FieldsetTable
            legend={`Outlook for the next ${outlookMonths.length} months`}
            headers={[
              { label: "Forecast Revenue", code: "FORECAST_REVENUE", pattern: NUMBER_REGEX.FLOAT },
              { label: "Forecast Rooms", code: "FORECAST_ROOMS", pattern: NUMBER_REGEX.INT },
              { label: "Budget Revenue", code: "BUDGET_REVENUE", pattern: NUMBER_REGEX.FLOAT },
              { label: "Budget Rooms", code: "BUDGET_ROOMS", pattern: NUMBER_REGEX.INT },
              { label: "Available Rooms", code: "AVAILABLE_ROOMS", pattern: NUMBER_REGEX.INT },
            ]}
            rows={outlookMonths.map((month, i) => ({ label: month, code: i }))}
            flipName
            prefix="Outlook"
          />
        </FetchingElement>
        <Fieldset
          legend="Available rooms this month"
          fields={[
            { label: "Available rooms", code: "AVAILABLE_ROOMS", pattern: NUMBER_REGEX.INT },
          ]}
        />
      </Form>
    </div>
  );
}
