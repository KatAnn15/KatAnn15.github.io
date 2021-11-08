import * as React from "react";
import { FavoritesTypes } from "./Favorites.d";
import { Link } from "react-router-dom";
import { posterBase } from "@constants/Constants";
import "./Favorites.scss";

const Favorites: React.FC<FavoritesTypes> = ({ data }) => {
  return (
    <div className="favorites-wrapper">
      <h3 className="favorites_title">
        <i className="far fa-thumbs-up"></i> Favorites
      </h3>
      <div className="favorites_container">
        {data?.movies.map((item, i) => (
          <Link
            to={"movies/" + item.id}
            key={"wm" + i}
            className="favorite-link"
          >
            <img src={posterBase + item.poster} alt="posterImage" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
