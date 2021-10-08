export interface PaginationItemProps {
  pageNum: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
}

export interface ColorProps {
  color: "black" | typeof activeColor;
  setColor: React.Dispatch<React.SetStateAction<"black" | typeof activeColor>>;
}
