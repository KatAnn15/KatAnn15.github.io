import * as React from "react";
import PricingPlansPage from "../../../../../../../Main/PricingPlansPage/PricingPlans/PricingPlans";

const NoPlans: React.FC = () => {
  return (
    <div className="no-plan-wrapper">
      <h3 className="no-plans_title">Upgrade Now</h3>
      <PricingPlansPage />
    </div>
  );
};

export default NoPlans;
