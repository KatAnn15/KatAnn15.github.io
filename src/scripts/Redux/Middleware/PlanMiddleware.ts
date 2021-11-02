import { getPlans } from "@redux/AsyncThunks/AsyncThunks";
import { store } from "@redux/GlobalReducer";
import { setPlan } from "@redux/StateReducers";

export const planMiddleware = (storeApi) => (next) => (action) => {
  const { dispatch } = storeApi;
  const result = new Promise((resolve) => {
    resolve(next(action));
  });
  return result.then(() => {
    const state = store.getState();
    if (state.plan.value === null) {
      if (window.localStorage) {
        const item = window.localStorage.getItem("Prototype-defaultPlan");
        if (!item) {
          if (state.allPlans.status === "fulfilled") {
            dispatch(setPlan(state.allPlans.value[0]));
          } else if (state.allPlans.status === null) {
            dispatch(getPlans());
          }
        } else {
          if (!state.plan.value) {
            dispatch(setPlan(JSON.parse(item)));
          }
        }
      }
    }
    return next(action);
  });
};
