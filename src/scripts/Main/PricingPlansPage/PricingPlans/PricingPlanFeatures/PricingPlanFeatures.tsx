import { getSelector } from "@redux/Actions";
import * as React from "react";
import { features } from "../../../../Main/Utils/SliderChart/ChartConsts";
import SliderChart from "../../../Utils/SliderChart/SliderChart";
import "./PricingPlanFeatures.scss";

const PricingPlansFeatures: React.FC = () => {
  const currentPlan = getSelector("plan");
  return (
    <div className="plan-features-wrapper">
      {currentPlan
        ? features.map((feature, i) => (
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
          ))
        : null}
    </div>
  );
};
export default PricingPlansFeatures;
