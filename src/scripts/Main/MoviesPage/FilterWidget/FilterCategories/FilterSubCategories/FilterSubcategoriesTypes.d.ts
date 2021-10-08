export interface FilterSubcategoryItemProps {
  data: [string | Boolean, string | Boolean];
  category: string;
}
export interface ColorProps {
  fontColor: "gray" | "green";
  setColor: React.Dispatch<React.SetStateAction<"gray" | "green">>;
}
