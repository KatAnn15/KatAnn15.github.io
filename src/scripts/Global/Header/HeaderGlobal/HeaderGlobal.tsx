import React, { useCallback, useEffect, useState } from "react";
import firebase from "../../Firebase/firebase_setup";
import { Link } from "react-router-dom";
import SearchBar from "../../SearchBar/SearchBar";
import LoginModal from "../LoginModal/LoginModal";
import { isMobile } from "react-device-detect";
import {
  HeaderGlobalProps,
  ModalVisibleProps,
  MembersMoreToggle,
} from "./HeaderGlobalTypes";
import { getSelector } from "@redux/Actions";
import { useDispatch } from "react-redux";
import "./HeaderGlobal.scss";
import { setMemberStatus } from "@redux/Reducers";

const HeaderGlobal: React.FC = () => {
  const [logo, updateLogo] = useState<HeaderGlobalProps["logo"]>("");
  const [modalVisible, setModalVisibility] =
    useState<ModalVisibleProps["modalVisible"]>(false);
  const [areaExpanded, setAreaExpanded] =
    useState<MembersMoreToggle["areaExpanded"]>(false);
  const loggedIn = getSelector("membersStatus");
  const subscribed = getSelector("subscribedStatus");
  const name = getSelector("name");
  const dispatch = useDispatch();

  const fetchLogo = useCallback(async () => {
    const ref = firebase.storage().ref();
    const fileData = await ref.child("ATFImages/netflix.png");
    const file = await fileData.getDownloadURL();
    updateLogo(file);
  }, []);

  const setLoggedInStatus = () => {
    if (loggedIn) {
      dispatch(setMemberStatus(false));
      window.localStorage.removeItem("appAuth-email");
    } else {
      setModalVisibility(true);
    }
  };

  const toggleMembersAreaMobile: () => void = () => {
    areaExpanded ? setAreaExpanded(false) : setAreaExpanded(true);
  };

  useEffect(() => {
    fetchLogo();
  }, [fetchLogo]);

  return (
    <div className="header-global_wrapper">
      <Link to={"/"}>
        <img className="site-logo-img" src={logo} alt="Netflix logo" />
      </Link>
      <SearchBar />
      <div
        className="header-global_members-area"
        style={{ display: isMobile && !areaExpanded ? "none" : "flex" }}
      >
        <span>
          {" "}
          {loggedIn ? `Welcome, ${name}!` : "UNLIMITED TV SHOWS & MOVIES"}
        </span>
        {!subscribed && loggedIn ? (
          <Link to={"/pricing-plans"}>
            <button className="subscription-bar">Join Now</button>
          </Link>
        ) : null}
        <button className="login-bar" onClick={setLoggedInStatus}>
          {loggedIn ? "Sign Out" : "Sign Up"}
        </button>
      </div>
      {isMobile ? (
        <button
          className="members-bar_mobile-more-btn"
          onClick={toggleMembersAreaMobile}
        >
          More
        </button>
      ) : null}
      {modalVisible ? (
        <LoginModal setModalVisibility={setModalVisibility} />
      ) : null}
    </div>
  );
};

export default HeaderGlobal;
