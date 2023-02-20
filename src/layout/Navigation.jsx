import style from "../assets/css/navigation.module.css";
import { NavLink } from "react-router-dom";

export default function Navigation() {
  return (
    <nav id={style.navigation}>
      <ul>
        <NavSection section={["drr", "Daily Revenue Report"]} />
        <NavSection
          section={["day", "Daily Input"]}
          links={[
            ["rooms", "Rooms Input"],
            ["foodservice", "F&B Input"],
            ["postings", "Postings Input"],
            ["reports", "Upload Report"],
          ]}
        />
        <NavSection
          section={["financial", "Financial Input"]}
          links={[
            ["rooms", "Rooms Input"],
            ["foodservice", "F&B Input"],
            ["rolling", "Rolling Forecast Input"],
          ]}
        />
        <NavSection
          section={["config", "Configuration"]}
          links={[
            ["hotel", "Hotel Panel"],
            ["admin", "Admin Panel"],
          ]}
        />
      </ul>
    </nav>
  );
}

function NavSection({ section, links }) {
  return (
    <li>
      {!links ? (
        <CustomNavLink
          to={section[0]}
          label={section[1]}
        />
      ) : (
        <>
          {section[1]}
          <NavSectionLinks links={links.map(link => [`${section[0]}/${link[0]}`, link[1]])} />
        </>
      )}
    </li>
  );
}

function NavSectionLinks({ links }) {
  return (
    <ul>
      {links.map(([to, label]) => (
        <li key={to + label}>
          <CustomNavLink
            to={to}
            label={label}
          />
        </li>
      ))}
    </ul>
  );
}

function CustomNavLink({ to, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => (isActive ? style.active : undefined)}
    >
      {label}
    </NavLink>
  );
}
