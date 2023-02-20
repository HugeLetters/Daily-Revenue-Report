import "flatpickr/dist/themes/dark.css";
import Flatpickr from "react-flatpickr";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import style from "../assets/css/header.module.css";
import { useSelector } from "../hooks/reduxHooks";
import { set } from "../store/dateSlice";

export default function Header() {
  const dispatch = useDispatch();
  const date = useSelector(state => state.date);
  function handleChange(_, e) {
    dispatch(set(e));
  }
  return (
    <header id={style.header}>
      <img src={`/logo/color.png`} />
      <div>{date.value}</div>
      <Flatpickr
        required
        placeholder="Select Date"
        value={date.value}
        onClose={handleChange}
        options={{
          dateFormat: date.format,
          allowInput: true,
        }}
        form="currentForm"
      />
      <Link to="profile">Profile</Link>
      <Link to="login">Login</Link>
      <Link to="register">Register</Link>
    </header>
  );
}
