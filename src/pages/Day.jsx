import Postings from "./day/Postings";
import FoodService from "./day/FoodService";
import Rooms from "./day/Rooms";

export default function Day({ page }) {
  return { rooms: <Rooms />, foodservice: <FoodService />, postings: <Postings /> }[page];
}
