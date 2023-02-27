import produce from "immer";
import { useReducer } from "react";
import Form from "../../components/Form";
import { NUMBER_REGEX } from "../../utils/utils";

export default function Postings() {
  const [inputs, inputsDispatch] = useReducer(
    produce((draft, { reset, value, row, isValueInput }) => {
      if (reset) return [["", ""]];
      if (!value && !draft[row][1 * !isValueInput]) {
        draft.splice(row, 1);
      } else {
        if (draft[row].every(cell => !cell)) {
          draft.push(["", ""]);
        }
        draft[row][1 * isValueInput] = value;
      }
    }),
    [["", ""]]
  );

  function handleChange(value, row, isValueInput) {
    inputsDispatch({ value, row, isValueInput });
  }
  function handleReset() {
    inputsDispatch({ reset: true });
  }

  return (
    <div>
      <h1>Daily Postings Input</h1>
      <b>In case of duplicate posting codes the former will take precedence!</b>
      <br />
      <em>Transaction codes which are not in the database will be discarded</em>
      <Form
        endpoint="/api/input/day/postings"
        onReset={handleReset}
      >
        <table>
          <thead>
            <tr>
              <th>Posting Code</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {inputs.map(([code, value], i) => (
              <tr key={i}>
                <td>
                  <input
                    aria-label="posting code"
                    value={code}
                    onChange={({ currentTarget: { value } }) => handleChange(value, i, false)}
                    required={i !== inputs.length - 1}
                    pattern={NUMBER_REGEX.POSTING}
                  />
                </td>
                <td>
                  <input
                    name={code || undefined}
                    aria-label="posting amount"
                    value={value}
                    onChange={({ currentTarget: { value } }) => handleChange(value, i, true)}
                    required={i !== inputs.length - 1}
                    pattern={NUMBER_REGEX.FLOAT}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Form>
    </div>
  );
}
