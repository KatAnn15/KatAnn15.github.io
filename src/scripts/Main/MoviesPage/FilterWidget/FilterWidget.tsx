import * as React from "react";
import FilterCategoriesList from "./FilterCategories/FilterCategoriesList";
import { useDispatch } from "react-redux";
import "./FilterWidget.scss";
import { toggleFilter } from "@redux/AsyncSlices/ExpandFilterSlice";

const FilterWidget: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <div className="filter-widget_wrapper" style={{ top: 0 }}>
      <FilterCategoriesList />
      <button
        className="filter-widget_close-btn"
        onClick={() => dispatch(toggleFilter())}
      >
        Close
      </button>
    </div>
  );
};

export default FilterWidget;
