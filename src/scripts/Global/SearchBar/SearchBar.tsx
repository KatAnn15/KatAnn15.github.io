import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import SearchItem from "./SearchItem";
import "./SearchBar.scss";
import { useDispatch } from "react-redux";
import { getSelector } from "@redux/Actions";
import { getSearchMovies } from "@redux/AsyncThunks/AsyncThunks";

interface DisplayProps {
  display: "grid" | "none";
}

const SearchBar: React.FC = () => {
  const [display, setDisplay] = useState<DisplayProps["display"]>("none");
  const history = useHistory();
  const dispatch = useDispatch();
  const searchItems = getSelector("search");
  const searchMovie = (e: React.KeyboardEvent<HTMLInputElement>) => {
    let target = e.currentTarget;
    if (target.value.length > 2) {
      dispatch(getSearchMovies(target.value));
      target.focus();
      setDisplay("grid");
    }
    if (target.value.trim() === "") {
      changeDisplay();
    }
  };
  const changeDisplay = () => {
    setDisplay("none");
  };
  useEffect(() => {
    history.listen((location, action) => {
      if (action === "PUSH") {
        changeDisplay();
      }
    });
  }, [history, getSearchMovies]);

  return (
    <div className="search-bar_wrapper">
      <input
        className="search-bar_input-bar"
        list="movies-list"
        name="moviesSearch"
        placeholder="Search a movie..."
        autoComplete="off"
        onInput={searchMovie}
        data-testid="test_searchInput"
      />
      <div
        className="search-options_wrapper"
        style={{ display: display }}
        data-testid="test_searchResults"
      >
        {searchItems?.map((item) => (
          <Link to={"/movies/" + item.id} key={item.id}>
            <SearchItem title={item.title} poster_path={item.poster_path} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
