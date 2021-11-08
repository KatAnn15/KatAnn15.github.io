import React, { useState, useEffect, useCallback } from "react";
import firebase from "../../Firebase/firebase_setup";
import MembersBar from "../MembersBar/MembersBar";
import { Link } from "react-router-dom";
import LoginModal from "../LoginModal/LoginModal";
import "./HeaderHome.scss";
import { getSelector } from "@redux/Actions";

interface LogoProps {
  logo: string;
  updateLogo: string;
}

interface ModalVisibleProps {
  modalVisible: Boolean;
  setModalVisibility: React.Dispatch<React.SetStateAction<Boolean>>;
}
const HeaderHome: React.FC = () => {
  const [logo, updateLogo] = useState<LogoProps["logo"]>("");
  const modalVisible = getSelector("login");
  const fetchLogo = useCallback(async () => {
    const ref = firebase.storage().ref();
    const fileData = await ref.child("ATFImages/netflix.png");
    const file = await fileData.getDownloadURL();
    updateLogo(file);
  }, []);

  useEffect(() => {
    fetchLogo();
  }, [fetchLogo]);

  return (
    <div className="header-home_wrapper">
      <Link to={"/"}>
        <img className="site-logo-img" src={logo} alt="Netflix logo" />
      </Link>
      <MembersBar />
      {modalVisible ? <LoginModal /> : null}
    </div>
  );
};

export default HeaderHome;
