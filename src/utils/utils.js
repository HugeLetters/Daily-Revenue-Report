import { redirect } from "react-router-dom";

export function indexRedirect(redirectPath) {
  return () => redirect(redirectPath);
}

export const NUMBER_REGEX = {
  INT: "\\d+",
  FLOAT: "\\d+(\\.\\d{1,2})?",
  POSTING: "0|([1-9][0-9]{0,3})",
};
