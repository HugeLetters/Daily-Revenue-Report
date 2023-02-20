import Error from "../../components/Error";
import Fieldset from "../../components/Fieldset";
import FieldsetTable from "../../components/FieldsetTable";
import Form from "../../components/Form";
import Loading from "../../components/Loading";
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

  if (outlets.isLoading) return <Loading text="F&B Outlets are being loaded from the server" />;
  if (outlets.isError) return <Error errorText={outlets.error} />;
  if (headers.isLoading)
    return <Loading text="F&B Posting types are being loaded from the server" />;
  if (headers.isError) return <Error errorText={headers.error} />;

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
        <FieldsetTable
          legend={"F&B"}
          headers={[
            ...headers.data.map(x => ({ ...x, pattern: NUMBER_REGEX.FLOAT })),
            { label: "Covers", pattern: NUMBER_REGEX.INT },
          ]}
          rows={outlets.data}
        />
      </Form>
    </div>
  );
}
