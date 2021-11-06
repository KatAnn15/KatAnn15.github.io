import React, { useState, useEffect } from "react";
import { isMobile } from "react-device-detect";
import { setMemberStatus } from "@redux/UserReducers";
import { getAuth } from "@firebase/auth";
import { getSelector } from "@redux/Actions";
import { useDispatch } from "react-redux";
import "./MembersBar.scss";
import { MembersBarProps, LoginDisplayProps } from "./MembersBarTypes";

const MembersBar: React.FC<MembersBarProps> = ({ setModalVisibility }) => {
  const user = getSelector("user");
  const memberStatus = getSelector("membersStatus");
  const dispatch = useDispatch();

  const [mLoginDisplay, setMLoginDisplay] =
    useState<LoginDisplayProps["mLoginDisplay"]>("none");

  const setUserStatus = () => {
    if (memberStatus) {
      dispatch(setMemberStatus(false));
    } else {
      setModalVisibility(true);
    }
  };

  const toggleLoginBtnForMobile: () => void = () => {
    if (isMobile) {
      mLoginDisplay === "none"
        ? setMLoginDisplay("block")
        : setMLoginDisplay("none");
    }
  };
  useEffect(() => {
    if (!user) {
      const auth = getAuth();
      auth.onAuthStateChanged(() => {
        if (auth.currentUser) {
          dispatch(setMemberStatus(true));
        } else {
          dispatch(setMemberStatus(false));
        }
      });
    }
  });

  return (
    <div className="members-bar_wrapper">
      {memberStatus ? (
        <button
          className="member_welcome-message"
          onClick={toggleLoginBtnForMobile}
        >
          Welcome, {user?.displayName}
        </button>
      ) : null}
      <button
        className="members-bar_login-button"
        style={{
          display:
            (isMobile && !memberStatus) || !isMobile ? "block" : mLoginDisplay,
          top:
            isMobile && memberStatus
              ? "-10px"
              : isMobile && !memberStatus
              ? "-35px"
              : "25px",
        }}
        onClick={setUserStatus}
      >
        {memberStatus ? "Log Out" : "Log In"}
      </button>
    </div>
  );
};

export default MembersBar;
