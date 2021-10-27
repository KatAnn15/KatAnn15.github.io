import React, { useEffect } from "react";
import { getMovies, getOneMovie } from "@redux/AsyncThunks/AsyncThunks";
import { useDispatch } from "react-redux";
import { getSelector } from "@redux/Actions";

const TestComponent: React.FC = () => {
  const dispatch = useDispatch();
  const movie = getSelector("movie");
  useEffect(() => {
    dispatch(getOneMovie(610253));
  }, [getMovies]);
  return (
    <div className="test">
      <p>{JSON.stringify(movie)}</p>
    </div>
  );
};

export default TestComponent;
