import React, { useState, useCallback, useEffect } from "react";
import FilterCategoryItem from "./FilterCategoryItem/FilterCategoryItem";
import { getGenres } from "./FilterCategoriesListActions";
import { CatgoriesProps } from "./FilterCategoriesListTypes";

const FilterCategoriesList: React.FC = () => {
  const [categories, setCategories] = useState<CatgoriesProps["categories"]>([
    null,
  ]);

  const renderCategories = useCallback(async () => {
    const genres = await getGenres();

    const categoriesNamesList = [
      {
        label: "Categories",
        value: [
          { val: "top_rated", lab: "Top Rated" },
          { val: "popular", lab: "Popular" },
          { val: "upcoming", lab: "Upcoming" },
          { val: "now_playing", lab: "Now Playing" },
        ],
      },
      { label: "Genres", value: genres },
      {
        label: "Include Adult",
        value: [
          { lab: "Include", val: true },
          { lab: "Exclude", val: false },
        ],
      },
    ];
    const categoriesLists = categoriesNamesList.map((categoryItem, i) => (
      <FilterCategoryItem data={categoryItem} key={"cat" + i} />
    ));
    setCategories(categoriesLists);
  }, []);

  useEffect(() => {
    renderCategories();
  }, [renderCategories]);

  return <div className="filter-categories-list_wrapper">{categories}</div>;
};

export default FilterCategoriesList;
