import FoodService from "./financial/FoodService";
import RollingForecast from "./financial/RollingForecast";
import Rooms from "./financial/Rooms";

export default function Financial({ page }) {
  return { rooms: <Rooms />, foodservice: <FoodService />, rolling: <RollingForecast /> }[page];
}
