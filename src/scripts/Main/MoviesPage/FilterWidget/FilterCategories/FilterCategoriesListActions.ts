import { key } from "@constants/Constants";

export const getGenres = async () => {
  const genresData: { genres: { name: string; id: number }[] } = await fetch(
    "https://api.themoviedb.org/3/genre/movie/list" + key
  ).then((resp) => resp.json());
  const allGenresNames = genresData.genres.map((genre) => ({
    lab: genre.name,
    val: genre.id.toString(),
  }));
  return allGenresNames;
};
