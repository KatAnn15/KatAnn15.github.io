import * as React from "react";
import ActivityToggle from "./ActivityToggle";
import { MovieActivityTypes } from "./MovieActivity.d";
import "./MovieActivity.scss";

const MovieActivity: React.FC<MovieActivityTypes> = ({ id, poster }) => {
  return (
    <div className="movie-activity-wrapper">
      <ActivityToggle id={id} poster={poster} collection="Favorites" />
      <ActivityToggle id={id} poster={poster} collection="WatchedMovies" />
    </div>
  );
};

export default MovieActivity;
