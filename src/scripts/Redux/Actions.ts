import { useSelector, RootStateOrAny, useDispatch } from "react-redux";

export function getSelector(reducer: string) {
  const state = useSelector((state: RootStateOrAny) => state[reducer]);
  return state.value;
}
