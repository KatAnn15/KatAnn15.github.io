import React, { useState, useCallback, useEffect } from "react";
import { PlanOverviewProps } from "../Checkout";
import { PlanInfoProps } from "../Checkout";
import SliderChart from "../../../../Main/Utils/SliderChart/SliderChart";
import "./PlanOverview.scss";
import { features } from "../../../Utils/SliderChart/ChartConsts";
import { getSelector } from "@redux/Actions";

const PlanOverview = () => {
  const planInfo = getSelector("plan");
  const checkoutPlanStyle = {
    background: planInfo?.color,
  };

  const setPlanFeatures = () => {
    if (planInfo) {
      return features.map((feature, i) => (
        <SliderChart
          feature={feature}
          currentPlan={planInfo}
          sliderWidth={150}
          mode="short"
          key={"ftr" + i}
        />
      ));
    }
  };

  const setPlanInfo: () => void = useCallback(() => {}, [planInfo]);
  useEffect(() => setPlanInfo(), [setPlanInfo]);

  return (
    <div className="checkout-plan_wrapper">
      <h3 className="checkout-plan_title">Plan overview: </h3>
      <div className="checkout-plan_plan-info-wrapper">
        <div className="plan-details_container" style={checkoutPlanStyle}>
          <h3 className="checkout_plan-name">{planInfo?.name}</h3>
          <h3 className="checkout_plan-price">
            <span>$</span>
            {planInfo?.price}
          </h3>
          <h3 className="checkout_plan-title">{planInfo?.title}</h3>
          <div className="plans-tech-fetaures_container">
            {setPlanFeatures()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanOverview;
