export interface MovieItemDetailsProps {
  movieData: {
    id: number;
    adult: Boolean;
    genres: { id: number; name: string }[];
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    revenue: number;
    status: string;
    tagline: string;
    vote_count: number;
  }[];
}
