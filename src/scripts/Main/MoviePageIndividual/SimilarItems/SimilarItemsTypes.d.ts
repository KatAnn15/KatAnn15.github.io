export interface SimilarItemsProps {
  similarItems: [] | JSX.Element[];
  setSimilar: React.Dispatch<React.SetStateAction<[] | JSX.Element[]>>;
}

interface MovieItemSimilarProps {
  id: string;
}
