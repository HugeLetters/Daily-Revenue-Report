import Postings from "./day/Postings";
import Foodservice from "./day/Foodservice";
import Rooms from "./day/Rooms";

export default function Day({ page }) {
  return { rooms: <Rooms />, foodservice: <Foodservice />, postings: <Postings /> }[page];
}
