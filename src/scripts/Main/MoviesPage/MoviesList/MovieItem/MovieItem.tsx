import * as React from "react";
import { Link } from "react-router-dom";
import { key } from "@constants/Constants";
import { posterBase } from "@constants/Constants";
import { MovieItemProps } from "./MovieItemTypes";

const MovieItem: React.FC<MovieItemProps> = ({ title, id, poster_path }) => {
  return (
    <Link to={`/movies/${id}`}>
      <div className="movie-item_wrapper" key={id.toString()}>
        <div
          className="movie-item_poster-container"
          style={{ backgroundImage: `url(${posterBase}${poster_path}${key})` }}
        ></div>
        <h3 className="movie-item_title">{title}</h3>
      </div>
    </Link>
  );
};

export default MovieItem;
