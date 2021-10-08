import React, { useState, useCallback, useEffect } from "react";
import firebase from "../../../Global/Firebase/firebase_setup";
import {
  PricingPlansProps,
  CurrentPlanProps,
  PlanProps,
} from "../PricingPlans.d";
import PricingPlanItem from "../PricingPlanItem/PricingPlanItem";
import { Link } from "react-router-dom";
import SliderChart from "../../Utils/SliderChart/SliderChart";
import { features } from "../../Utils/SliderChart/ChartConsts";
import "./PricingPlans.scss";

const PricingPlansPage: React.FC = () => {
  const [plans, setPlans] = useState<PricingPlansProps["plans"]>(null);
  const [currentPlan, setCurrentPlan] =
    useState<CurrentPlanProps["currentPlan"]>(null);
  const ref = firebase.firestore();

  const setPlansList: () => void = useCallback(async () => {
    const collection = await ref.collection("PricingPlans");
    const plansData: JSX.Element[] = [];
    collection.onSnapshot((data) => {
      data.forEach((snap) => {
        const itemData: any = snap.data();
        plansData.push(
          <PricingPlanItem
            data={itemData}
            key={plansData.length}
            planData={{
              currentPlan: currentPlan,
              setCurrentPlan: setCurrentPlan,
            }}
            plans={plans}
          />
        );
      });
      setPlans(plansData);
    });
    if (currentPlan && plans) {
      const name = currentPlan.name;
      const sortedPlans = plans.sort((first, sec) =>
        first.props.data.name === name
          ? -1
          : sec.props.data.name === name
          ? 1
          : 0
      );
      setPlans(sortedPlans);
    }
  }, [ref, currentPlan]);

  const setTechFeatures = () => {
    if (currentPlan)
      return features.map((feature, i) => {
        return (
          <div className="info-item-container" key={i}>
            <p className="current-plan_feature-title">
              {feature["value"] === "devices"
                ? "Watch on your TV, computer, mobile phone and tablet"
                : feature["label"]}
            </p>
            <SliderChart
              feature={feature}
              sliderWidth={250}
              currentPlan={currentPlan}
              mode="full"
            />
          </div>
        );
      });
  };

  useEffect(() => setPlansList(), [setPlansList]);

  return (
    <div className="pricing-plans_wrapper">
      <div className="plans_container">{plans}</div>
      {currentPlan ? (
        <div className="current-plan-info">
          <p className="current-plan_title">{currentPlan?.title}</p>
          <div className="current-plan_tech-info">{setTechFeatures()}</div>
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
