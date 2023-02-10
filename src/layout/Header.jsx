import { useState } from "react";
import style from "../assets/css/header.module.css";

function getLogo(logo) {
  return new URL(
    `../assets/images/logo-${logo ? "color" : "gold"}.png`,
    import.meta.url
  );
}

export default function PageHeader() {
  const [logo, setLogo] = useState(true);

  return (
    <header id={style.header}>
      <h1>HEADER</h1>
      <button onClick={() => setLogo(logo => !logo)}>TOGGLE LOGO</button>
      <img src={getLogo(logo)} />
    </header>
  );
}
