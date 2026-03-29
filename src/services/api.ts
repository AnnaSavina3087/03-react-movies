import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

// Описуємо функцію так, щоб вона приймала об'єкт { query, page }
export const fetchMovies = async ({
  query,
  page,
}: {
  query: string;
  page: number;
}) => {
  const response = await axios.get("/search/movie", {
    params: {
      api_key: import.meta.env.VITE_API_KEY, // Беремо ключ з .env
      query,
      page,
      language: "en-US",
    },
  });
  return response.data.results;
};
