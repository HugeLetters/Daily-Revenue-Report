import produce from "immer";
import { useReducer } from "react";
import Error from "../../components/Error";
import FieldsetTable from "../../components/FieldsetTable";
import Form from "../../components/Form";
import Loading from "../../components/Loading";
import useFetchData from "../../hooks/useFetchData";
import { NUMBER_REGEX } from "../../utils/utils";

const eventsHeaders = [
  { label: "Name", code: "NAME" },
  { label: "Company", code: "COMPANY" },
  { label: "Room Nights", code: "ROOM_NIGHTS", pattern: NUMBER_REGEX.INT },
  { label: "Check-in", code: "CHECK_IN", type: "date" },
  { label: "Check-out", code: "CHECK_OUT", type: "date" },
  { label: "Status", code: "STATUS" },
];

export default function FoodService() {
  const outlets = useFetchData({
    endpoint: "/api/hotel/foodservice-outlets",
    key: ["foodservice outlets"],
  });
  const headers = useFetchData({
    endpoint: "/api/hotel/foodservice-postings",
    key: ["foodservice postings"],
  });
  const [events, dispatch] = useReducer(
    produce((draft, { reset, value, row, col }) => {
      if (reset) return [Array(6).fill("")];
      if (!value && draft[row].every((cell, i) => !cell || i === col)) {
        draft.splice(row, 1);
      } else {
        if (draft[row].every(cell => !cell)) {
          draft.push(Array(6).fill(""));
        }
        draft[row][col] = value;
      }
    }),
    [Array(6).fill("")]
  );

  function handleChange(value, row, col) {
    dispatch({ value, row, col });
  }
  function handleReset() {
    dispatch({ reset: true });
  }

  if (outlets.isLoading) return <Loading text="F&B Outlets are being loaded from the server" />;
  if (outlets.isError) return <Error errorText={outlets.error} />;
  if (headers.isLoading)
    return <Loading text="F&B Posting types are being loaded from the server" />;
  if (headers.isError) return <Error errorText={headers.error} />;

  return (
    <div>
      <h1>Daily F&B Input</h1>
      <Form
        endpoint="/api/input/day"
        onReset={handleReset}
      >
        <FieldsetTable
          legend={"Revenue & Covers - Simphony"}
          headers={[
            ...headers.data.map(x => ({ ...x, pattern: NUMBER_REGEX.FLOAT })),
            { label: "Covers", code: "COVERS", pattern: NUMBER_REGEX.INT },
          ]}
          rows={outlets.data}
        />
        <fieldset>
          <legend>Groups & Events</legend>
          <table>
            <thead>
              <tr>
                {eventsHeaders.map(({ label, code }) => (
                  <th key={code}>{label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {events.map((_, i) => (
                <tr key={i}>
                  {eventsHeaders.map(({ label, code, pattern, type }, col) => (
                    <td key={code}>
                      <input
                        type={type}
                        pattern={pattern}
                        name={i !== events.length - 1 && `EVENTS ${code} ${i}`}
                        required={i !== events.length - 1}
                        aria-label={label}
                        onChange={({ currentTarget: { value } }) => handleChange(value, i, col)}
                        value={events[i][col]}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </fieldset>
      </Form>
    </div>
  );
}
