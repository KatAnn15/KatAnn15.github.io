import React, { useCallback, useState, useEffect } from "react";
import MovieItem from "./MovieItem/MovieItem";
import {
  MoviesListProps,
  TransformStateProps,
  DisplayBackStateProps,
  DisplayForwardStateProps,
} from "./MovieListTypes.d";
import { slideListHandler } from "./MoviesListAction";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "@redux/AsyncThunks/AsyncThunks";
import "./MoviesList.scss";

const innerWidth = window.innerWidth;
let limit = 480;

const MoviesList: React.FC<MoviesListProps> = ({ category }) => {
  const [transform, setTransform] =
    useState<TransformStateProps["transform"]>(0);
  const [displayBack, setDisplayBack] =
    useState<DisplayBackStateProps["displayBack"]>("none");
  const [displayForward, setDisplayForward] =
    useState<DisplayForwardStateProps["displayForward"]>("flex");

  const dispatch = useDispatch();
  const moviesSelector = useSelector(
    (state: { movies: { data: { category: string; items: any[] }[] } }) =>
      state.movies.data
  );

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

  const renderMovies = useCallback(() => {
    dispatch(getMovies(category));
  }, [category, getMovies]);

  useEffect(() => {
    renderMovies();
  }, [renderMovies]);

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
          {moviesSelector.length > 0
            ? moviesSelector.map((movie) => {
                if (movie.category === category)
                  return movie.items.map((item) => {
                    const { title, id, poster_path } = item;
                    return (
                      <MovieItem
                        title={title}
                        id={id}
                        poster_path={poster_path}
                        key={id}
                      />
                    );
                  });
              })
            : []}
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
