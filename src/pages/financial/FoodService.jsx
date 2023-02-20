import Error from "../../components/Error";
import FieldsetTable from "../../components/FieldsetTable";
import Form from "../../components/Form";
import Loading from "../../components/Loading";
import useFetchData from "../../hooks/useFetchData";
import { NUMBER_REGEX } from "../../utils/utils";

export default function FoodService() {
  const outlets = useFetchData({
    endpoint: "/api/hotel/foodservice-outlets",
    key: ["foodservice outlets"],
  });
  const headers = useFetchData({
    endpoint: "/api/hotel/foodservice-postings",
    key: ["foodservice postings"],
  });

  if (outlets.isLoading) return <Loading text="F&B Outlets are being loaded from the server" />;
  if (outlets.isError) return <Error errorText={outlets.error} />;
  if (headers.isLoading)
    return <Loading text="F&B Posting types are being loaded from the server" />;
  if (headers.isError) return <Error errorText={headers.error} />;

  return (
    <div>
      <h1>Monthly F&B Input</h1>
      <Form endpoint="/api/input/financial">
        {["Budget", "Forecast"].map(fieldset => (
          <FieldsetTable
            key={fieldset}
            legend={fieldset}
            headers={[
              ...headers.data.map(x => ({ ...x, pattern: NUMBER_REGEX.FLOAT })),
              { label: "Covers", pattern: NUMBER_REGEX.INT },
            ]}
            rows={outlets.data}
            prefix={fieldset}
          />
        ))}
      </Form>
    </div>
  );
}
