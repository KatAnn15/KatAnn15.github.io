import { PlanProps } from "../../../../../../PricingPlansPage/PricingPlans.d";

export interface ProfilePlansTypes {
  data: {
    plans: PlanProps["plan"][];
  };
}

export interface ProfilePlanTypes {
  plan: PlanProps;
}
