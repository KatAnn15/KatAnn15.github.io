import { callDispatch, getSelector } from "@redux/Actions";
import React, { useEffect, useState } from "react";
import "./UserInfoSection.scss";
import { getAuth } from "@firebase/auth";
import { setMemberStatus } from "@redux/UserReducers";
import { BgImageProps } from "./UserInfoSection.d";
import { getStorageItem } from "@firebaseMy/firebase_actions";
import UserProfile from "./UserProfile/UserProfile";
import TagStrip from "./TagStrip/TagStrip";

const UserInfoSection: React.FC = () => {
  const dispatch = callDispatch();
  const user = getSelector("user");
  const [bgImage, setBgImage] = useState<BgImageProps["bgImage"]>(null);
  const style = {
    background: bgImage ? `center/cover url("${bgImage}")` : undefined,
  };

  const setImage = async () => {
    const image = await getStorageItem("Members/MyProfile/squidgame.jpg");
    setBgImage(image);
  };

  useEffect(() => {
    if (!user) {
      const auth = getAuth();
      auth.onAuthStateChanged(() => {
        if (auth.currentUser) {
          dispatch(setMemberStatus(true));
        } else {
          dispatch(setMemberStatus(false));
          window.location.href = "/";
        }
      });
    }
    setImage();
  });
  return (
    <div className="user-info-section-wrapper">
      <div className="user-info-container" style={style}>
        <TagStrip />
        <UserProfile />
      </div>
    </div>
  );
};

export default UserInfoSection;
