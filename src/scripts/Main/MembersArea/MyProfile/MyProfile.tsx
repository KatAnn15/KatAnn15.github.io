import React, { useEffect, useState } from "react";
import UserInfoSection from "./UserInfoSection/UserInfoSection";
import { ModalVisibleProps } from "../../../Global/Header/HeaderGlobal/HeaderGlobalTypes";
import "./MyProfile.scss";
import UserActivitiesSection from "./UserActivitiesSection/UserActivitiesSection";
import HeaderGlobal from "../../../Global/Header/HeaderGlobal/HeaderGlobal";
import { getSelector } from "@redux/Actions";
import LoginModal from "../../../Global/Header/LoginModal/LoginModal";
import MemberMenuGlobal from "../../../Global/MemberMenuGlobal/MemberMenuGlobal";
import { initUser } from "@constants/Functions";

const MyProfile: React.FC = () => {
  const user = getSelector("user");
  const [modalVisible, setModalVisibility] =
    useState<ModalVisibleProps["modalVisible"]>(false);
  useEffect(() => {
    initUser();
  });
  return (
    <div className="my-profile-wrapper">
      <HeaderGlobal />
      {user && !modalVisible ? (
        <div className="my-profile_logged-in">
          <MemberMenuGlobal />
          <UserInfoSection />
          <UserActivitiesSection />
        </div>
      ) : (
        <LoginModal setModalVisibility={setModalVisibility} />
      )}
    </div>
  );
};
export default MyProfile;
