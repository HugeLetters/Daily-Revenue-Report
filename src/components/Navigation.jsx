import { NavLink } from "react-router-dom";

export default function Navigation() {
  const activeStyle = { backgroundColor: "black" };
  return (
    <nav id="navigation">
      <ul>
        <li>
          <NavLink
            to=""
            style={({ isActive }) => (isActive ? activeStyle : {})}
          >
            Homepage
          </NavLink>
        </li>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <li key={i}>
            <NavLink
              to={"" + i}
              style={({ isActive }) => (isActive ? activeStyle : {})}
            >
              Links to {i}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
