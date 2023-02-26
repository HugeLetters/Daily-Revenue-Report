import FetchingElement from "../../components/FetchingElement";
import FieldsetTable from "../../components/FieldsetTable";
import Form from "../../components/Form";
import useFetchData from "../../hooks/useFetchData";
import { NUMBER_REGEX } from "../../utils/utils";

export default function Foodservice() {
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
      <h1>Monthly F&B Input</h1>
      <Form endpoint="/api/input/financial">
        <FetchingElement
          label="F&B outlets & categories"
          queries={[outlets, headers]}
        >
          {["Budget", "Forecast"].map(fieldset => (
            <FieldsetTable
              key={fieldset}
              legend={fieldset}
              headers={
                headers.isSuccess && [
                  ...headers.data.map(x => ({ ...x, pattern: NUMBER_REGEX.FLOAT })),
                  { label: "Covers", pattern: NUMBER_REGEX.INT },
                ]
              }
              rows={outlets.data}
              prefix={fieldset}
            />
          ))}
        </FetchingElement>
      </Form>
    </div>
  );
}
