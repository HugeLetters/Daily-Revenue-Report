import { useRouteError } from "react-router-dom";

export default function Error({ errorText }) {
  const error = useRouteError();
  return (
    <div>
      Server Error: {errorText} <br />
      Client Error: {error}
    </div>
  );
}
