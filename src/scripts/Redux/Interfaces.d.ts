import { PlanProps } from "../Main/PricingPlansPage/PricingPlans";

export interface ReducerActionTypeString {
  action: {
    type: string;
    payload: string | null;
  };
  value: {
    value: string | null;
  };
}

export interface ReducerActionTypeBoolean {
  action: {
    type: string;
    payload: Boolean;
  };
  value: {
    value: Boolean;
  };
}
