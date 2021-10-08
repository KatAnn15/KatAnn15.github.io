export interface PaginationListProps {
  paginationList: JSX.Element[] | null;
  setPaginationList: React.Dispatch<React.SetStateAction<JSX.Element[] | null>>;
}

export interface PaginationWidgetProps {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
}
