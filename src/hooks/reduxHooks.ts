import { useSelector as useBaseSelector } from "react-redux";
import { TypedUseSelectorHook } from "react-redux";
import store from "../store/store";

type RootState = ReturnType<typeof store.getState>;
export const useSelector: TypedUseSelectorHook<RootState> = useBaseSelector;
