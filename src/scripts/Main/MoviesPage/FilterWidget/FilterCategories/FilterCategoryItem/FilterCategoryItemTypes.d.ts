export interface FilterCategoryItemProps {
  data: {
    label: string;
    value: { val: string | Boolean; lab: string | Boolean }[];
  };
}
export interface SubcategoriesProps {
  subcategories: JSX.Element[] | null;
  setSubcategories: React.Dispatch<React.SetStateAction<JSX.Element[] | null>>;
}
export interface SubcatExpandedProps {
  subcatExpanded: "block" | "none";
  setSubcatExpanded: React.Dispatch<React.SetStateAction<"block" | "none">>;
}
