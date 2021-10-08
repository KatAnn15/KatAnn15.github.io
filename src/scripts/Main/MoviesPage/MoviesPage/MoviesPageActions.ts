import { key } from "@constants/Constants";

export function getMovies(
  paramsDouble: { key: string; value: string[] }[],
  page
) {
  const allMovies: (Promise<any> | undefined)[] = paramsDouble.map((param) => {
    switch (param.key) {
      case "categories":
        return new Promise((resolve, reject) => {
          const allCategoriesMovies = param.value.map((par) =>
            fetch(
              "https://api.themoviedb.org/3/movie/" +
                par +
                key +
                "&page=" +
                page
            )
              .then((resp) => resp.json())
              .then((data) => data.results)
          );
          Promise.all(allCategoriesMovies).then((resp) => {
            resolve([].concat.apply([], resp));
          });
        });
      case "genres":
        return fetch(
          "https://api.themoviedb.org/3/discover/movie" +
            key +
            "&with_genres=" +
            param.value.join("|") +
            "&page=" +
            page
        )
          .then((resp) => resp.json())
          .then((data) => data.results);
      case "include_adult":
        return fetch(
          "https://api.themoviedb.org/3/discover/movie" +
            key +
            "&include_adult" +
            param.value.join("|") +
            "&page=" +
            page
        )
          .then((resp) => resp.json())
          .then((data) => data.results);
    }
  });
  return allMovies;
}

export function setFetchedMovies(allMovies: (Promise<any> | undefined)[]) {
  return Promise.all(allMovies).then((response) => {
    const allResults: { title: string; id: number; poster_path: string }[] =
      [].concat.apply([], response);
    const allIDs: number[] = allResults.map((result) => result.id);
    const setIDs = [...new Set(allIDs)];
    const setResults: { title: string; id: number; poster_path: string }[] =
      setIDs.map((item) => allResults.filter((res) => res.id === item)[0]);
    return setResults;
  });
}
