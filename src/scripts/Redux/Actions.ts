import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { store } from "./GlobalReducer";

export function getSelector(reducer: string) {
  const state = useSelector((state: RootStateOrAny) => state[reducer]);
  return state.value;
}

export function getSelectorWithStatus(reducer: string) {
  const state = useSelector((state: RootStateOrAny) => state[reducer]);
  return state;
}

export type DispatchType = typeof store.dispatch;
export const callDispatch = () => useDispatch<DispatchType>();
