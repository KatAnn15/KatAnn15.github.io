import * as React from "react";
import { ProfilePlanTypes } from "./Plans.d";

const ProfilePlan: React.FC<ProfilePlanTypes["plan"]> = ({ plan }) => {
  return (
    <div className="profile-plan-wrapper">
      <div
        className="profile-plan_container"
        style={{ background: plan.color }}
      >
        <h2 className="profile-plan_name">{plan.title}</h2>
        <ul className="profile-plan_features">
          <li className="plan-feature_item">
            Watch movies with {plan.quality.label} quality
          </li>
          <li className="plan-feature_item">
            In {plan.resolution.label} resolution
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfilePlan;
