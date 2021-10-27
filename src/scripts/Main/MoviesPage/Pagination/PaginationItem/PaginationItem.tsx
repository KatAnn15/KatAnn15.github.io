import React, { useState, useCallback, useEffect } from "react";
import { ColorProps, PaginationItemProps } from "./PaginationItemTypes";
import { setPage } from "@redux/StateReducers";
import { callDispatch, getSelector } from "@redux/Actions";

const activeColor = "blue";

const PaginationItem: React.FC<PaginationItemProps> = ({ pageNum }) => {
  const [color, setColor] = useState<ColorProps["color"]>("black");
  const dispatch = callDispatch();
  const pageD = getSelector("page");

  const checkColor = useCallback(() => {
    if (pageNum === pageD) {
      setColor(activeColor);
    } else {
      setColor("black");
    }
  }, [pageD, pageNum]);

  useEffect(() => {
    checkColor();
  }, [checkColor]);

  return (
    <div className="pagination-item_wrapper">
      <button
        className="pagination-item_btn"
        onClick={() => dispatch(setPage(pageNum))}
        style={{ color: color, borderColor: color }}
      >
        {pageNum}
      </button>
    </div>
  );
};

export default PaginationItem;
