import { useQuery } from "@tanstack/react-query";
import { useSelector } from "./reduxHooks";

export default function useFetchData({ endpoint, key, method = "GET", enabled = true }) {
  if (!{ GET: true, HEAD: true }[method])
    throw "Please use another webhook for POST queries\nThis webhook is for GET type of requests";
  const date = useSelector(state => state.date.value);
  return useQuery({
    queryKey: key,
    queryFn: () => {
      console.log("Fetching!");
      if (!endpoint) throw `No endpoint specified\nContact your IT manager to fix the issue`;
      return fetch(`${endpoint}?${new URLSearchParams({ date })}`, { method })
        .then(x => x.json())
        .then(({ ok, data, error }) => {
          if (!ok) throw error;
          return data;
        });
    },
    refetchOnWindowFocus: false,
    staleTime: 1,
    enabled,
  });
}