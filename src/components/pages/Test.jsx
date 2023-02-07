import { useParams } from "react-router-dom";

export default function Test() {
  const { id } = useParams();

  return <div>{id}</div>;
}
