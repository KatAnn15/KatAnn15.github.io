import React, { useState, useEffect } from "react";
import { isMobile } from "react-device-detect";
import { setEmailValue, setMemberStatus, setNameValue } from "@redux/Reducers";
import { getSelector } from "@redux/Actions";
import { useDispatch } from "react-redux";
import "./MembersBar.scss";
import { getMemberInfoFromCache } from "./MembersBarActions";
import { MembersBarProps, LoginDisplayProps } from "./MembersBarTypes";

const MembersBar: React.FC<MembersBarProps> = ({ setModalVisibility }) => {
  const memberStatus = getSelector("membersStatus");
  const memberName = getSelector("name");
  const dispatch = useDispatch();

  const [mLoginDisplay, setMLoginDisplay] =
    useState<LoginDisplayProps["mLoginDisplay"]>("none");

  const setUserStatus = () => {
    if (memberStatus) {
      dispatch(setMemberStatus(false));
      window.localStorage.removeItem("appAuth-email");
      window.localStorage.removeItem("appAuth-name");
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
  const setDefaultStatuses = async () => {
    const data = await getMemberInfoFromCache();
    if (data) {
      dispatch(setEmailValue(data[0]));
      dispatch(setNameValue(data[1]));
      dispatch(setMemberStatus(true));
    }
  };
  useEffect(() => {
    setDefaultStatuses();
  });

  return (
    <div className="members-bar_wrapper">
      {memberStatus ? (
        <button
          className="member_welcome-message"
          onClick={toggleLoginBtnForMobile}
        >
          Welcome, {memberName}
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
