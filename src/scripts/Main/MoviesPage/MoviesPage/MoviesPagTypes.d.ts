export interface FilterExpandedStateProps {
  filterExpanded: Boolean;
  setFilterStatus: React.Dispatch<React.SetStateAction<Boolean>>;
}

export interface MoviesListProps {
  moviesList: JSX.Element[] | React.ReactElement | null;
  setMoviesList: React.Dispatch<
    React.SetStateAction<null | JSX.Element[] | React.ReactElement>
  >;
}

export interface PageProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}
