import * as React from "react";
import HeaderGlobal from "../../../Global/Header/HeaderGlobal/HeaderGlobal";
import FilterWidget from "../FilterWidget/FilterWidget";
import MoviesList from "../MoviesList/MoviesList";
import { useState, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import FilteredMovieItem from "../FilteredMoviesList/FilteredMovieItem";
import PaginationWidget from "../Pagination/PaginationWidget";
import { MoviesListProps } from "./MoviesPagTypes";
import { getMovies, setFetchedMovies } from "./MoviesPageActions";
import { toggleFilter } from "@redux/AsyncSlices/ExpandFilterSlice";
import { callDispatch, getSelector } from "@redux/Actions";
import MemberMenuGlobal from "../../../Global/MemberMenuGlobal/MemberMenuGlobal";

const MoviesPage: React.FC = () => {
  const [moviesList, setMoviesList] =
    useState<MoviesListProps["moviesList"]>(null);
  const location = useLocation();
  const search = location.search;
  const page = getSelector("page");
  const filterExpanded = getSelector("fiterToggle");
  const dispatch = callDispatch();

  const setMoviesListDeafult = useCallback(async () => {
    if (search) {
      const currentParams = search.replace("?", "");
      const paramsArray = currentParams
        .split("&")
        .map((splitee) => splitee.split("="));
      let paramsDouble: { key: string; value: string[] }[] = paramsArray.map(
        (param) => ({ key: param[0], value: param[1].toString().split("|") })
      );

      const allMovies = await getMovies(paramsDouble, page);
      const setResults: { title: string; id: number; poster_path: string }[] =
        await setFetchedMovies(allMovies);
      const moviesList = setResults.map((res, i) => (
        <FilteredMovieItem
          title={res.title}
          id={res.id}
          poster_path={res.poster_path}
          key={i}
        />
      ));
      setMoviesList(
        <div className="filtered-movie-list_wrapper">{moviesList}</div>
      );
    } else {
      const categories = ["upcoming", "top_rated"];
      const defaultList = categories.map((category, i) => (
        <MoviesList category={category} key={"cat" + i} />
      ));
      setMoviesList(defaultList);
    }
  }, [search, page]);

  useEffect(() => {
    setMoviesListDeafult();
  }, [setMoviesListDeafult]);

  return (
    <div className="movies-page_wrapper">
      <HeaderGlobal />
      <MemberMenuGlobal />
      <div className="filter-widget-space_wrapper">
        {filterExpanded ? (
          <FilterWidget />
        ) : (
          <h3
            className="filter-widget-space_title"
            onClick={() => dispatch(toggleFilter())}
            style={{ top: "50px" }}
          >
            Discover More
          </h3>
        )}
      </div>
      <h1 className="movies-page_title">Netflix choice</h1>
      <div className="movies-list_page-container">{moviesList}</div>
      {search ? <PaginationWidget /> : null}
    </div>
  );
};

export default MoviesPage;
