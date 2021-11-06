import * as React from "react";
import ActivitiesMenu from "./ActivitiesMenu/ActivitiesMenu";
import ActivityBox from "./ActivityBox/ActivityBox";
import "./UserActivitiesSection.scss";

const UserActivitiesSection: React.FC = () => {
  return (
    <div className="user-activities-section-wrapper">
      <ActivitiesMenu />
      <ActivityBox />
    </div>
  );
};

export default UserActivitiesSection;
