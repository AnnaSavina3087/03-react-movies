import axios from "axios";
import type { Movie } from "../types/movie";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Accept: "application/json",

    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
  },
});

interface FetchMoviesResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const response = await instance.get<FetchMoviesResponse>("/search/movie", {
    params: {
      query: query,
      include_adult: false,
      language: "en-US",
      page: 1,
    },
  });

  return response.data.results;
};

export default instance;
