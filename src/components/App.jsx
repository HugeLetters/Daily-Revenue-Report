import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import TopHeader from "./TopHeader";

export default function App() {
  return (
    <div id="app">
      <TopHeader />
      <Navigation />
      <Outlet />
    </div>
  );
}
