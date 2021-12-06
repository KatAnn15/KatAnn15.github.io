import React, { useCallback, useEffect } from "react";
import { callDispatch, getSelector } from "@redux/Actions";
import { getMovies } from "@redux/AsyncThunks/AsyncThunks";

const TestComponent: React.FC = () => {
  const dispatch = callDispatch();
  const movies = getSelector("movies");
  const triggerData = useCallback(() => {
    dispatch(getMovies("123445"));
  }, [callDispatch]);
  useEffect(() => triggerData);
  return (
    <div className="test">
      <p data-testid="test-element"> {movies}</p>
    </div>
  );
};

export default TestComponent;
