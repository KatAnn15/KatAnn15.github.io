import * as React from "react";
import NoPlans from "./NoPlans";
import { ProfilePlansTypes } from "./Plans.d";
import ProfilePlan from "./ProfilePlan";
import "./Plans.scss";

const ProfilePlans: React.FC<ProfilePlansTypes> = ({ data }) => {
  return (
    <div className="profile-plans-wrapper">
      <h3 className="profile-plans_title">
        <i className="fas fa-coins"></i> My Subscriptions{" "}
      </h3>
      {!data ? (
        <NoPlans />
      ) : (
        <div className="profile-plans_container">
          {data.plans.map((plan, i) => (
            <ProfilePlan plan={plan} key={"pp" + i} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfilePlans;
