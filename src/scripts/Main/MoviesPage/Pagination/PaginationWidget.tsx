import React, { useState, useEffect, useCallback } from "react";
import PaginationItem from "./PaginationItem/PaginationItem";
import { PaginationListProps } from "./PaginationWidgetTypes";
import "./PaginationWidget.scss";

const limit = 5;

const PaginationWidget: React.FC = () => {
  const [paginationList, setPaginationList] =
    useState<PaginationListProps["paginationList"]>(null);

  useEffect(() => {
    const pagesArray = new Array(limit)
      .fill(0)
      .map((item, i) => (item = i))
      .map((item) => <PaginationItem pageNum={item + 1} key={item} />);
    setPaginationList(pagesArray);
  }, [setPaginationList]);

  return <div className="pagination-widget_wrapper">{paginationList}</div>;
};

export default PaginationWidget;
