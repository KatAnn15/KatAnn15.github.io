export interface PaginationItemProps {
  pageNum: number;
}

export interface ColorProps {
  color: "black" | typeof activeColor;
  setColor: React.Dispatch<React.SetStateAction<"black" | typeof activeColor>>;
}
