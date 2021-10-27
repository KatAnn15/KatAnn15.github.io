import React, { useEffect } from "react";
import HeaderGlobal from "../../../Global/Header/HeaderGlobal/HeaderGlobal";
import MovieItemDetails from "../MovieDetails/MovieIndDetails";
import SimilarItems from "../SimilarItems/SimilarItems";
import { useLocation } from "react-router";
import "./MovieItemIndividual.scss";
import MovieItemVideos from "../MovieItemVideos";

const MovieItemIndividual: React.FC = () => {
  const location = useLocation();
  const movieId: string = location.pathname.replace("/movies/", "");
  useEffect(() => {
    window.scroll({ top: 0, behavior: "smooth" });
  });

  return (
    <div className="movie_item_individual_wrapper">
      <HeaderGlobal />
      <MovieItemDetails id={+movieId} />
      <MovieItemVideos id={movieId} />
      <SimilarItems id={movieId} />
    </div>
  );
};

export default MovieItemIndividual;
