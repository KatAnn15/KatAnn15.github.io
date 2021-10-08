import React, { useState, useCallback, useEffect } from "react";
import FilterSubcategoriesList from "../FilterSubCategories/FilterSubcategoriesList";
import {
  FilterCategoryItemProps,
  SubcategoriesProps,
  SubcatExpandedProps,
} from "./FilterCategoryItemTypes";

const FilterCategoryItem: React.FC<FilterCategoryItemProps> = ({ data }) => {
  const [subcategories, setSubcategories] = useState<
    SubcategoriesProps["subcategories"]
  >([]);
  const [subcatExpanded, setSubcatExpanded] =
    useState<SubcatExpandedProps["subcatExpanded"]>("block");

  const handleCatClick = () => {
    subcatExpanded === "block"
      ? setSubcatExpanded("none")
      : setSubcatExpanded("block");
  };

  const renderSubcats = useCallback(() => {
    const allSubcats = data.value.map((subcat, i) => (
      <FilterSubcategoriesList
        data={[subcat.lab, subcat.val]}
        category={data.label}
        key={"value" + i}
      />
    ));
    setSubcategories(allSubcats);
  }, [data]);

  useEffect(() => renderSubcats(), [renderSubcats]);

  return (
    <div className="filter-category-item_wrapper">
      <button className="category-label_wrapper" onClick={handleCatClick}>
        {data.label}
      </button>
      <div
        className="subcategories-list_wrapper"
        style={{ display: subcatExpanded }}
      >
        {subcategories}
      </div>
    </div>
  );
};

export default FilterCategoryItem;
