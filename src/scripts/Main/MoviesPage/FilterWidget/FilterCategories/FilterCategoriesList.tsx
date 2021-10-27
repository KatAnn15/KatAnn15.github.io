import React, { useEffect } from "react";
import FilterCategoryItem from "./FilterCategoryItem/FilterCategoryItem";
import { getGenres } from "@redux/AsyncThunks/AsyncThunks";
import { callDispatch, getSelectorWithStatus } from "@redux/Actions";

const FilterCategoriesList: React.FC = () => {
  const dispatch = callDispatch();
  const genres = getSelectorWithStatus("genres");

  useEffect(() => {
    dispatch(getGenres());
  }, [getGenres]);

  return (
    <div className="filter-categories-list_wrapper">
      {genres.status === "fulfilled"
        ? genres.value.map((categoryItem, i) => (
            <FilterCategoryItem data={categoryItem} key={"cat" + i} />
          ))
        : null}
    </div>
  );
};

export default FilterCategoriesList;
