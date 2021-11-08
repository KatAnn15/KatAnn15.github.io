import React, { useEffect } from "react";
import HeaderGlobal from "../../../Global/Header/HeaderGlobal/HeaderGlobal";
import MovieItemDetails from "../MovieDetails/MovieIndDetails";
import SimilarItems from "../SimilarItems/SimilarItems";
import { useLocation } from "react-router";
import "./MovieItemIndividual.scss";
import MovieItemVideos from "../MovieItemVideos";
import { getSelector } from "@redux/Actions";
import MemberMenuGlobal from "../../../Global/MemberMenuGlobal/MemberMenuGlobal";

const MovieItemIndividual: React.FC = () => {
  const location = useLocation();
  const movieId: string = location.pathname.replace("/movies/", "");
  const user = getSelector("user");
  useEffect(() => {
    window.scroll({ top: 0, behavior: "smooth" });
  });

  return (
    <div className="movie_item_individual_wrapper">
      <HeaderGlobal />
      {user ? <MemberMenuGlobal /> : null}
      <MovieItemDetails id={+movieId} />
      <MovieItemVideos id={movieId} />
      <SimilarItems id={movieId} />
    </div>
  );
};

export default MovieItemIndividual;
