import { useMutation } from "@tanstack/react-query";
import { useSelector } from "./reduxHooks";

export default function useSubmitData({ endpoint, method = "POST" }) {
  if ({ GET: true, HEAD: true }[method])
    throw "Please use another webhook for GET queries\nThis webhook is for POST type of requests";
  const date = useSelector(state => state.date);
  return useMutation({
    mutationFn: (data: FormData): Promise<any> => {
      if (!endpoint) throw `No endpoint specified\nContact your IT manager to fix the issue`;
      // TODO remove sendAll, should only send non-empty values
      const sendAll = true;
      const body = sendAll ? data : new FormData();
      for (const [k, v] of data) {
        if (sendAll) break;
        if (v) body.append(k, v);
      }
      return fetch(`${endpoint}?${new URLSearchParams({ date })}`, { method, body }).then(x => {
        if (!x.ok) throw x.statusText;
        return x.text();
      });
    },
  });
}
