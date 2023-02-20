import style from "../assets/css/form.module.css";

export default function FieldsetTable({
  legend,
  headers,
  rows,
  prefix = null,
  flipName = false,
  showRowCodes = false,
}) {
  return (
    <fieldset>
      <legend>{legend}</legend>
      <table>
        <thead>
          <tr>
            <th aria-hidden="true"></th>
            {headers.map(({ label }) => (
              <th key={label}>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(({ label: rLabel, code: rCode }) => {
            return (
              <tr key={rCode ?? rLabel}>
                <th>
                  {rLabel}
                  {showRowCodes && <span className={style.textHighlight}> ({rCode})</span>}
                </th>
                {headers.map(({ label: hLabel, code: hCode, pattern }) => {
                  const nameArray = [rCode ?? rLabel, hCode ?? hLabel];
                  if (flipName) nameArray.reverse();
                  prefix && nameArray.unshift(prefix);
                  return (
                    <td key={hCode ?? hLabel}>
                      <input
                        name={nameArray.join(" ")}
                        aria-label={`${rLabel} ${hLabel}`}
                        pattern={pattern}
                      />
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </fieldset>
  );
}
