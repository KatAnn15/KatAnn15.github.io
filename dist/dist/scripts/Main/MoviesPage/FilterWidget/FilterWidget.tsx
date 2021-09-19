import * as React from 'react';
import FilterCategoriesList from './FilterCategories/FilterCategoriesList';
import "./FilterWidget.scss";

interface FilterWidgetProps {
    setFiltersStatus: () => void
}

const FilterWidget: React.FC<FilterWidgetProps> = ({setFiltersStatus}) => {
    return( 
        <div className="filter-widget_wrapper" style={{top: 0}}>
            <FilterCategoriesList />
            <button className="filter-widget_close-btn" onClick={setFiltersStatus}>Close</button>
        </div>
    )
}

export default FilterWidget