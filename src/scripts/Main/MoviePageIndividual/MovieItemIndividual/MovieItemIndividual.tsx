import React, { useEffect, useCallback, useState } from "react";
import HeaderGlobal from "../../../Global/Header/HeaderGlobal/HeaderGlobal";
import MovieItemDetails from "../MovieDetails/MovieIndDetails";
import MovieItemSimilar from "../SimilarItems/SimilarItemsOne";
import { MovieDetailsProps } from "./MovieItemIndividualTypes";
import { useLocation } from "react-router";
import { key } from "@constants/Constants";
import "./MovieItemIndividual.scss";

const initDetails = {
  id: 0,
  adult: false,
  genres: [{ id: 1, name: "" }],
  original_title: "",
  overview: "",
  popularity: 12,
  poster_path: "",
  release_date: "",
  revenue: 12345,
  status: "Released",
  tagline: "",
  vote_count: 123,
};

const MovieItemIndividual: React.FC = () => {
  const location = useLocation();
  const movieId: string = location.pathname.replace("/movies", "");

  const [movieDetails, setMovieDetails] =
    useState<MovieDetailsProps["movieDetails"]>(initDetails);

  const getMovieData = useCallback(async () => {
    console.log("screen width: ", window.innerWidth);
    const movieData = await fetch(
      `https://api.themoviedb.org/3/movie${movieId}${key}`
    ).then((resp) => resp.json());
    setMovieDetails(movieData);
    window.scroll({ top: 0, behavior: "smooth" });
  }, [movieId]);

  useEffect(() => {
    getMovieData();
  }, [getMovieData]);

  return (
    <div className="movie_item_individual_wrapper">
      <HeaderGlobal />
      <MovieItemDetails movieData={[movieDetails]} />
      <MovieItemSimilar id={movieId} />
    </div>
  );
};

export default MovieItemIndividual;
