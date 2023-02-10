import style from "../assets/css/navigation.module.css";
import { NavLink } from "react-router-dom";

export default function Navigation() {
  return (
    <nav id={style.navigation}>
      <ul>
        <NavSection
          section="Home"
          links={[[""]]}
        />
        <NavSection
          section="Data Input"
          links={[
            ["rooms", "Rooms Input"],
            ["postings", "Postings Input"],
            ["f&b", "F&B Input"],
            ["finance", "Financial Input"],
            ["reports", "Upload Report"],
          ]}
        />
        <NavSection
          section="Daily Revenue Report"
          links={[["drr"]]}
        />
        <NavSection
          section="Settings"
          links={[
            ["profile", "Profile Settings"],
            ["hotel", "Hotel Settings"],
            ["admin", "Admin Settings"],
          ]}
        />
      </ul>
    </nav>
  );
}

function NavSection({ section, links }) {
  return (
    <li>
      {links.length === 1 ? (
        <CustomNavLink
          to={links[0][0]}
          label={section}
        />
      ) : (
        <>
          {section}
          <NavSectionLinks links={links} />
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
