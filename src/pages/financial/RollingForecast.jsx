import FetchingElement from "../../components/FetchingElement";
import Fieldset from "../../components/Fieldset";
import FieldsetTable from "../../components/FieldsetTable";
import Form from "../../components/Form";
import useFetchData from "../../hooks/useFetchData";
import { NUMBER_REGEX } from "../../utils/utils";

export default function RollingForecast() {
  const outlets = useFetchData({
    endpoint: "/api/hotel/foodservice-outlets",
    key: ["foodservice outlets"],
  });
  const headers = useFetchData({
    endpoint: "/api/hotel/foodservice-postings",
    key: ["foodservice postings"],
  });

  return (
    <div>
      <h1>Rolling Forecast Input</h1>
      <Form endpoint="/api/input/rolling">
        <Fieldset
          legend="Rooms"
          fields={[
            { label: "Rooms Occupied", code: "ROOMS_OCCUPIED", pattern: NUMBER_REGEX.INT },
            { label: "Revenue", pattern: NUMBER_REGEX.FLOAT },
            { label: "Other Revenue", code: "OTHER_REVENUE", pattern: NUMBER_REGEX.FLOAT },
          ]}
        />
        <FetchingElement
          label="F&B outlets & categories"
          queries={[outlets, headers]}
        >
          <FieldsetTable
            legend={"F&B"}
            headers={
              headers.isSuccess && [
                ...headers.data.map(x => ({ ...x, pattern: NUMBER_REGEX.FLOAT })),
                { label: "Covers", pattern: NUMBER_REGEX.INT },
              ]
            }
            rows={outlets.data}
          />
        </FetchingElement>
      </Form>
    </div>
  );
}
