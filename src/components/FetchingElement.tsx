import { UseQueryResult } from "@tanstack/react-query";
import Error from "./Error";
import Loading from "./Loading";

export default function FetchingElement({
  children,
  queries,
  label = "Data",
}: {
  children: React.ReactNode;
  queries: UseQueryResult<any, unknown>[];
  label: string;
}) {
  if (queries.some(({ isLoading }) => isLoading))
    return <Loading text={`${label} is being loaded from the server`} />;

  for (let query of queries) {
    if (query.isError) return <Error errorText={query.error} />;
  }

  if (queries.every(({ isSuccess }) => isSuccess)) return children;
}
