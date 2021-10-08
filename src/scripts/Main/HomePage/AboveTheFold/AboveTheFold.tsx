import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ATFDataProps } from "./AboveTheFoldTypes";
import { fetchCollectionData } from "./AboveTheFoldActions";
import { getSelector } from "@redux/Actions";
import "./AboveTheFold.scss";

const AboveTheFold: React.FC = () => {
  const [ATFData, setATFData] = useState<ATFDataProps["ATFData"]>({
    title: "",
    subtitle: "",
    imageURL: "",
    actionNote: "",
  });
  const loggedIn = getSelector("membersStatus");
  const subscribed = getSelector("subscribedStatus");
  const fetchAFTData = useCallback(async () => {
    fetchCollectionData(setATFData);
  }, []);

  useEffect(() => {
    fetchAFTData();
  }, [fetchAFTData]);

  return (
    <div className="above-the-fold-wrapper">
      <img
        className="above-the-fold_cover-image"
        src={ATFData.imageURL}
        alt="movies list cover"
      />
      <div className="above-the-fold_info-wrapper">
        <div className="above-the-fold_info-container">
          <h1 className="above-the-fold_title">{ATFData.title}</h1>
          {loggedIn === true && subscribed ? (
            <div className="above-the-fold_loggedIn__true_div">
              <h2 className="above-the-fold_subtitle">Begin your journey</h2>
              <button className="above-the-fold_action-button">
                <Link to="/movies"> Watch Now </Link>
              </button>
            </div>
          ) : (
            <div className="above-the-fold_loggedIn__false_div">
              <h2 className="above-the-fold_subtitle">{ATFData.subtitle}</h2>
              <h3 className="above-the-fold_action-note">
                {ATFData.actionNote}
              </h3>
              {subscribed ? null : (
                <Link to={"/pricing-plans"}>
                  <button className="above-the-fold_join-btn">Subscribe</button>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboveTheFold;
