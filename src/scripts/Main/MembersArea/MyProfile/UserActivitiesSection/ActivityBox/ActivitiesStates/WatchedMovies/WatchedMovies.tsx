import * as React from "react";
import { WatchedMoviesTypes } from "./WatchedMovies.d";
import { Link } from "react-router-dom";
import { posterBase } from "@constants/Constants";
import "./WatchedMovies.scss";

const WatchedMovies: React.FC<WatchedMoviesTypes> = ({ data }) => {
  return (
    <div className="watched-movies-wrapper">
      <h3 className="watched-movies_title">
        <i className="far fa-file-video"></i> History
      </h3>
      <div className="watched-movies_container">
        {data?.movies.map((item, i) => (
          <Link
            to={"movies/" + item.id}
            key={"wm" + i}
            className="watched-movie-link"
          >
            <img src={posterBase + item.poster} alt="posterImage" />
            <span>
              Watched on{" "}
              {new Date(item._createdDate).toLocaleString("en-US", {
                dateStyle: "medium",
                timeStyle: "medium",
              })}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default WatchedMovies;
