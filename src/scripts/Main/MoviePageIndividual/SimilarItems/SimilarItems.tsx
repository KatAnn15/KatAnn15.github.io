import React, { useCallback, useEffect } from "react";
import { MovieItemSimilarProps } from "./SimilarItemsTypes";
import SimilarItem from "./SimilarItem";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getSelector } from "@redux/Actions";
import { getSimilar } from "@redux/AsyncThunks/AsyncThunks";

const SimilarItems: React.FC<MovieItemSimilarProps> = ({ id }) => {
  const dispatch = useDispatch();
  const similar = getSelector("similar");

  const getSimilarData = useCallback(() => {
    dispatch(getSimilar(id));
  }, [getSimilar, id]);

  useEffect(() => {
    getSimilarData();
  }, [getSimilarData]);

  return (
    <div className="movie-item-similar_wrapper">
      <h3 className="movie-item_similar_text">Discover More:</h3>
      <div className="movie-item_similar_container">
        {similar.map((item, i) => (
          <Link to={"/movies/" + item.id} key={"simLink" + i}>
            <SimilarItem data={item} key={"similar" + i} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SimilarItems;
