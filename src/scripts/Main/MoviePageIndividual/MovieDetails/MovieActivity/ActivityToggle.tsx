import { getSelector } from "@redux/Actions";
import React, { useEffect, useState } from "react";
import { MovieToggleTypes } from "./MovieActivity.d";
import { checkIfPresent, setActivity } from "./ActivityActions";

const ActivityToggle: React.FC<MovieToggleTypes> = ({
  id,
  poster,
  collection,
}) => {
  const [toggleOn, setToggle] = useState(false);
  const user = getSelector("user");

  const toggleActivity = async () => {
    if (user.uid && collection && !toggleOn) {
      setToggle(true);
      setActivity(collection, user.uid, id, poster);
    }
  };

  useEffect(() => {
    if (collection && user) {
      checkIfPresent(collection, id, user.uid).then((bool) =>
        bool ? setToggle(true) : setToggle(false)
      );
    }
  }, [collection, user]);

  return (
    <div
      className={`${collection?.toLowerCase()}-toggle-wrapper`}
      onClick={toggleActivity}
    >
      {collection === "Favorites" ? (
        <i
          className="far fa-thumbs-up"
          style={{ color: toggleOn ? "green" : "white" }}
        ></i>
      ) : (
        <i
          className="fas fa-eye"
          style={{ color: toggleOn ? "red" : "white" }}
        ></i>
      )}
    </div>
  );
};

export default ActivityToggle;
