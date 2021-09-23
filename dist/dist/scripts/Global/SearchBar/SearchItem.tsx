import * as React from 'react';

const posterPlaceholder = "https://imgix.bustle.com/uploads/image/2017/8/29/c8c8077a-10fc-44d5-93f0-da4e592a299e-netflix-logo-print_pms.jpg";

interface SearchItemProps {
    title: string,
    poster_path: string
}
const posterBase = "https://image.tmdb.org/t/p/original";

const SearchItem: React.FC<SearchItemProps> = ({title, poster_path}) => {
    return (
        <div className="search-item_wrapper" style={{backgroundImage: poster_path ? `url(${posterBase + poster_path})`: `url(${posterPlaceholder})`}}>
            <h5 className="search-item_title">{title}</h5>
        </div>
    )
}

export default SearchItem