import { createAsyncThunk } from "@reduxjs/toolkit";
import { key, setCategoriesList } from "@constants/Constants";
import { MovieItemDetailsProps } from "../../Main/MoviePageIndividual/MovieDetails/MovieIndDetailsTypes";
import axios from "axios";
import firebase from "@firebaseMy/firebase_setup";

export const getMovies = createAsyncThunk(
  "movies/getMovies",
  async (prefix: string) => {
    const popularMovies = await fetch(
      `https://api.themoviedb.org/3/movie/${prefix}${key}`
    );
    const moviesData = await popularMovies.json();
    const results: MovieItemDetailsProps["movieData"][] = moviesData.results;
    return { category: prefix, items: results };
  }
);

export const getOneMovie = createAsyncThunk(
  "movie/getOneMovie",
  async (movieId: number) => {
    const movieData = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}${key}`
    );
    const json = await movieData.json();
    return json;
  }
);

export const getVideos = createAsyncThunk(
  "videos/getVideos",
  async (id: string) => {
    const videoData = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos` + key
    );
    const json = await videoData.json();
    const allVideos: { key: string }[] = json.results;
    return allVideos;
  }
);

export const getSimilar = createAsyncThunk(
  "similar/getSimilar",
  async (id: string) => {
    const similarData = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/similar${key}`
    ).then((resp) => resp.json());
    const similarItems: {
      poster_path: string;
      original_title: string;
      id: number;
    }[] = similarData.results;
    return similarItems;
  }
);

export const getSearchMovies = createAsyncThunk(
  "search/getSearchMovies",
  async (value: string) => {
    const fetchedData = await fetch(
      `https://api.themoviedb.org/3/search/movie` +
        key +
        "&query=" +
        value +
        "&page=1"
    );
    const json = await fetchedData.json();
    const items: { id: number; title: string; poster_path: string }[] =
      json.results;
    return items;
  }
);

export const getCountries = createAsyncThunk(
  "countries/getCountries",
  async () => {
    const slug = window.location.hostname;
    const request = await axios.get("https://" + slug + "/countries");
    const data = await request.data;
    return data;
  }
);

export const postCheckout = createAsyncThunk(
  "checkout/postCheckout",
  (formData: FormData) => {
    const slug = window.location.hostname;
    return fetch("https://" + slug + "/create-checkout-session", {
      method: "POST",
      body: formData,
    }).then((resp) => resp.json());
  }
);

export const getGenres = createAsyncThunk("genres/getGenres", async () => {
  const json = await fetch(
    "https://api.themoviedb.org/3/genre/movie/list" + key
  ).then((resp) => resp.json());
  const genres = json.genres;
  const allGenresNames = genres.map((genre) => ({
    lab: genre.name,
    val: genre.id.toString(),
  }));
  return setCategoriesList(allGenresNames);
});

export const getPlans = createAsyncThunk("plans/getPlans", async () => {
  const ref = firebase.firestore();
  const collection = await ref.collection("PricingPlans");
  const promise = new Promise((resolve) => {
    const plansData: any[] = [];
    collection.onSnapshot((data) => {
      data.forEach((snap) => {
        const itemData: any = snap.data();
        plansData.push(itemData);
      });
      resolve(plansData);
    });
  });
  return promise;
});
