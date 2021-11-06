import React from "react";
import UserInfoSection from "./UserInfoSection/UserInfoSection";
import "./MyProfile.scss";
import UserActivitiesSection from "./UserActivitiesSection/UserActivitiesSection";

const MyProfile: React.FC = () => {
  return (
    <div className="my-profile-wrapper">
      <UserInfoSection />
      <UserActivitiesSection />
    </div>
  );
};
export default MyProfile;
