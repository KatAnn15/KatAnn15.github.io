import React, { useCallback, useState, useEffect } from "react";
import MovieItem from "./MovieItem/MovieItem";
import { key } from "@constants/Constants";
import {
  MoviesListProps,
  MoviesListStateProps,
  TransformStateProps,
  DisplayBackStateProps,
  DisplayForwardStateProps,
} from "./MovieListTypes.d";
import { slideListHandler } from "./MoviesListAction";
import "./MoviesList.scss";

const innerWidth = window.innerWidth;
let limit = 480;

const MoviesList: React.FC<MoviesListProps> = ({ category }) => {
  const [movies, pushMovies] = useState<MoviesListStateProps["movies"]>([null]);
  const [transform, setTransform] =
    useState<TransformStateProps["transform"]>(0);
  const [displayBack, setDisplayBack] =
    useState<DisplayBackStateProps["displayBack"]>("none");
  const [displayForward, setDisplayForward] =
    useState<DisplayForwardStateProps["displayForward"]>("flex");

  const slideList = (tag: string) => {
    slideListHandler(
      tag,
      transform,
      limit,
      category,
      setTransform,
      setDisplayForward,
      setDisplayBack
    );
  };

  const getMovies = useCallback(async () => {
    const popularMovies = await fetch(
      `https://api.themoviedb.org/3/movie/${category}${key}`
    );
    const moviesData = await popularMovies.json();
    const results: { title: string; id: string; poster_path: string }[] =
      moviesData.results;
    const moviesItems: JSX.Element[] = results.map((movie) => {
      const { title, id, poster_path } = movie;
      return (
        <MovieItem title={title} id={id} poster_path={poster_path} key={id} />
      );
    });
    pushMovies(moviesItems);
  }, [category]);

  useEffect(() => {
    getMovies();
  }, [getMovies]);

  return (
    <div className="movies-list_wrapper">
      <h2 className="movies-page_subtitle">{category.toUpperCase()}</h2>
      <div className="movies-page_movies-list">
        <div
          className="movies-list_navigation movies-list_navigation__left"
          style={{ display: displayBack }}
        >
          <button
            className="movies-list_nav-btn movies-list_nav-btn_left"
            onClick={(e) => slideList("back")}
          >
            <span></span>
          </button>
        </div>
        <div
          className="movies-list_movies-container"
          id={`movies-container_${category}`}
          style={{ transform: `translateX(${transform}px)` }}
        >
          {movies}
        </div>
        <div
          className="movies-list_navigation movies-list_navigation__right"
          style={{ display: displayForward }}
        >
          <button
            className="movies-list_nav-btn movies-list_nav-btn_right"
            onClick={(e) => slideList("forward")}
          >
            <span></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoviesList;
