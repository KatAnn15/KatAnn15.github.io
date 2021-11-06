import { getSelector } from "@redux/Actions";
import React, { useEffect, useState } from "react";
import { DisplayElementTypes } from "./ActivityBox.d";
import MediaFiles from "./ActivitiesStates/MediaFiles/MediaFiles";
import WatchedMovies from "./ActivitiesStates/WatchedMovies/WatchedMovies";
import "./ActivityBox.scss";
import Favorites from "./ActivitiesStates/Favorites/Favorites";

const ActivityBox: React.FC = () => {
  const currentCat = getSelector("profileCategory");
  const profileActivity = getSelector("profileActivities");
  const [displayElement, setDisplayElement] =
    useState<DisplayElementTypes["displayElement"]>(null);

  useEffect(() => {
    if (profileActivity[currentCat])
      switch (currentCat) {
        case "MediaFiles":
          setDisplayElement(
            <MediaFiles data={profileActivity[currentCat][0]} />
          );
          break;
        case "WatchedMovies":
          setDisplayElement(
            <WatchedMovies data={profileActivity[currentCat][0]} />
          );
          break;
        case "Favorites":
          setDisplayElement(
            <Favorites data={profileActivity[currentCat][0]} />
          );
          break;
      }
  }, [currentCat, profileActivity]);

  return (
    <div className="activity-box-wrapper">
      {currentCat ? displayElement : null}
    </div>
  );
};

export default ActivityBox;
