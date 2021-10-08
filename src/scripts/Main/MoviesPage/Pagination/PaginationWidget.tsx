import React, { useState, useEffect, useCallback } from "react";
import PaginationItem from "./PaginationItem/PaginationItem";
import {
  PaginationListProps,
  PaginationWidgetProps,
} from "./PaginationWidgetTypes";
import "./PaginationWidget.scss";

const limit = 5;

const PaginationWidget: React.FC<PaginationWidgetProps> = ({
  setPage,
  page,
}) => {
  const [paginationList, setPaginationList] =
    useState<PaginationListProps["paginationList"]>(null);

  const setPages = useCallback(() => {
    const pagesArray = new Array(limit)
      .fill(0)
      .map((item, i) => (item = i))
      .map((item) => (
        <PaginationItem pageNum={item + 1} setPage={setPage} page={page} />
      ));
    setPaginationList(pagesArray);
  }, [setPage, page]);

  useEffect(() => {
    setPages();
  }, [setPages]);

  return <div className="pagination-widget_wrapper">{paginationList}</div>;
};

export default PaginationWidget;
