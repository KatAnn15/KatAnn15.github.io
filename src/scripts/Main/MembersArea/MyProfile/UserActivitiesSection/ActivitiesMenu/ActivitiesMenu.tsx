import { getFirestoreData } from "@firebaseMy/firebase_actions";
import { callDispatch, getSelector } from "@redux/Actions";
import { setProfileCat } from "@redux/StateReducers";
import React, { useEffect, useState } from "react";
import { ProfileCatsTypes } from "./ActivitiesMenu.d";
import "./ActivitiesMenu.scss";

const ActivitiesMenu: React.FC = () => {
  const [profileCats, setProfileCats] = useState<
    ProfileCatsTypes["profileCat"]
  >([]);
  const dispatch = callDispatch();
  const currentCat = getSelector("profileCategory");
  useEffect(() => {
    getFirestoreData("ProfileCategories").then((resp) => {
      const categories = resp
        .sort((f, n) => f.id - n.id)
        .map((item) => (
          <button
            className="profile-category-button"
            key={item.value}
            onClick={() => dispatch(setProfileCat(item.value))}
            style={{
              backgroundColor: currentCat === item.value ? "red" : "black",
            }}
          >
            {item.name}
          </button>
        ));
      setProfileCats(categories);
      if (!currentCat) dispatch(setProfileCat(resp[0].value));
    });
  }, [currentCat, dispatch, setProfileCat]);
  return <div className="activities-menu-wrapper">{profileCats}</div>;
};

export default ActivitiesMenu;
