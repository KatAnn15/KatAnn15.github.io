import React, { useEffect, useState } from "react";
import PricingPlanItem from "../PricingPlanItem/PricingPlanItem";
import { Link } from "react-router-dom";
import { callDispatch, getSelector } from "@redux/Actions";
import "./PricingPlans.scss";
import { getPlans } from "@redux/AsyncThunks/AsyncThunks";
import PricingPlansFeatures from "./PricingPlanFeatures/PricingPlanFeatures";
import { PricingPlanItemProps } from "../PricingPlans";

const PricingPlansPage: React.FC = () => {
  const dispatch = callDispatch();
  const plans = getSelector("allPlans");
  const [plansLocal, setPlansLocal] =
    useState<PricingPlanItemProps["plansLoc"]["plansLocal"]>(null);
  const currentPlan = getSelector("plan");

  useEffect(() => {
    if (!plans) {
      dispatch(getPlans());
    }
    if (currentPlan && plans) {
      const array = plans;
      const sorted = [...array].sort((first, sec) =>
        first.name === currentPlan.name
          ? -1
          : sec.name === currentPlan.name
          ? 1
          : 0
      );
      setPlansLocal(sorted);
    }
  }, [currentPlan, plans]);

  return (
    <div className="pricing-plans_wrapper">
      <div className="plans_container">
        {plans && currentPlan
          ? plans.map((onePlan, i) => (
              <PricingPlanItem
                data={onePlan}
                plansLoc={{ plansLocal, setPlansLocal }}
                key={i}
              />
            ))
          : null}
      </div>
      {plans && currentPlan ? (
        <div className="current-plan-info">
          <p className="current-plan_title">{currentPlan?.title}</p>
          <div className="current-plan_tech-info">
            {<PricingPlansFeatures />}
          </div>
          <Link
            to={{
              pathname: "/checkout",
              state: { planInfo: JSON.stringify(currentPlan) },
            }}
          >
            <button className="plan-checkout_btn">Checkout</button>
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default PricingPlansPage;
