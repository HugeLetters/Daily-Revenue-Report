import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import style from "../assets/css/header.module.css";
import { useSelector } from "../hooks/reduxHooks";
import { set } from "../store/dateSlice";

export default function Header() {
  const dispatch = useDispatch();
  const date = useSelector(state => state.date);
  function handleChange(e) {
    dispatch(set(e.target.value));
  }
  return (
    <header id={style.header}>
      <img src={`/logo/color.png`} />
      <div>{date.replace(/(\d{4,})-(\d{2})-(\d{2})/, "$3.$2.$1")}</div>
      <input
        type="date"
        required
        form="currentForm"
        value={date}
        onChange={handleChange}
      />
      <Link to="profile">Profile</Link>
      <Link to="login">Login</Link>
      <Link to="register">Register</Link>
    </header>
  );
}
