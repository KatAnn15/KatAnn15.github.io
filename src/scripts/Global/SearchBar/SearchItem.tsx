import * as React from "react";
import { posterBase, posterPlaceholder } from "@constants/Constants";
interface SearchItemProps {
  title: string;
  poster_path: string;
}

const SearchItem: React.FC<SearchItemProps> = ({ title, poster_path }) => {
  return (
    <div
      className="search-item_wrapper"
      style={{
        backgroundImage: poster_path
          ? `url(${posterBase + poster_path})`
          : `url(${posterPlaceholder})`,
      }}
    >
      <h5 className="search-item_title">{title}</h5>
    </div>
  );
};

export default SearchItem;
