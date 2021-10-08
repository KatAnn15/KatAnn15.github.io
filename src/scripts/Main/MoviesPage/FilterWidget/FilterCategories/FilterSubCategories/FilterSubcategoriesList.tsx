import React, { useEffect, useCallback, useState } from "react";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
import { handleButtonColors, handleFilter } from "./FilterSubcategoriesActions";
import {
  FilterSubcategoryItemProps,
  ColorProps,
} from "./FilterSubcategoriesTypes";

const FilterSubcategoryItem: React.FC<FilterSubcategoryItemProps> = ({
  data,
  category,
}) => {
  const history = useHistory();
  const location = useLocation();
  const [fontColor, setColor] = useState<ColorProps["fontColor"]>("gray");

  const setParams = async () => {
    const newHistory = await handleFilter(location, category, data, setColor);
    history.push(newHistory);
  };

  const setFilters = useCallback(() => {
    const currentParams = location.search.replace("?", "");
    handleButtonColors(currentParams, data, setColor);
  }, [location, data]);

  useEffect(() => {
    setFilters();
  }, [setFilters]);

  return (
    <div className="filter-subcategory-item_wrapper">
      <button
        className="filter-subcategory-item_button"
        onClick={setParams}
        style={{ color: fontColor }}
      >
        {data[0]}
      </button>
    </div>
  );
};

export default FilterSubcategoryItem;
