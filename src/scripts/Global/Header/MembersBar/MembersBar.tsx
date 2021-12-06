import React, { useState, useEffect } from "react";
import { isMobile } from "react-device-detect";
import { setMemberStatus } from "@redux/UserReducers";
import { getSelector } from "@redux/Actions";
import { useDispatch } from "react-redux";
import "./MembersBar.scss";
import { LoginDisplayProps } from "./MembersBarTypes";
import { Link } from "react-router-dom";
import { initUser } from "@constants/Functions";
import { setModalVisibility } from "@redux/StateReducers";

const MembersBar: React.FC = () => {
  const user = getSelector("user");
  const memberStatus = getSelector("membersStatus");
  const dispatch = useDispatch();

  const [mLoginDisplay, setMLoginDisplay] =
    useState<LoginDisplayProps["mLoginDisplay"]>("none");

  const setUserStatus = () => {
    if (memberStatus) {
      dispatch(setMemberStatus(false));
    } else {
      dispatch(setModalVisibility(true));
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
    initUser();
  });

  return (
    <div className="members-bar_wrapper">
      {memberStatus ? (
        <Link
          to={"/my-profile"}
          className="member_welcome-message"
          onClick={toggleLoginBtnForMobile}
          data-testid="test_myProfileBtn"
        >
          Welcome, {user?.displayName}
        </Link>
      ) : null}
      <button
        className="members-bar_login-button"
        data-testid="test_membersBarLoginBtn"
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
