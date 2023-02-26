import Foodservice from "./financial/Foodservice";
import RollingForecast from "./financial/RollingForecast";
import Rooms from "./financial/Rooms";

export default function Financial({ page }) {
  return { rooms: <Rooms />, foodservice: <Foodservice />, rolling: <RollingForecast /> }[page];
}
