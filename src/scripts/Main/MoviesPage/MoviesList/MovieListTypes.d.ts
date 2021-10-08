export interface MoviesListStateProps {
  movies: (null | JSX.Element)[];
  pushMovies: React.Dispatch<React.SetStateAction<(JSX.Element | null)[]>>;
}
export interface MoviesListProps {
  category: string;
}
export interface TransformStateProps {
  transform: number;
  setTransform: React.Dispatch<React.SetStateAction<number>>;
}
export interface DisplayBackStateProps {
  displayBack: string;
  setDisplayBack: React.Dispatch<React.SetStateAction<string>>;
}
export interface DisplayForwardStateProps {
  displayForward: string;
  setDisplayForward: React.Dispatch<React.SetStateAction<string>>;
}
