import style from "../assets/css/form.module.css";

export default function Fieldset({ legend, fields, prefix = "" }) {
  return (
    <fieldset>
      <legend>{legend}</legend>
      <section className={style.fieldsetGrid}>
        {fields.map(({ label, code, pattern }) => (
          <label key={code ?? label}>
            {label}
            <input
              name={(prefix ? prefix + " " : "") + (code ?? label)}
              pattern={pattern}
            />
          </label>
        ))}
      </section>
    </fieldset>
  );
}
