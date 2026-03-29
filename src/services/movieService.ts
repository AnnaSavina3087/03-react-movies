import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

// Вказуємо, що функція приймає ОБ'ЄКТ із query та page
export const fetchMovies = async ({
  query,
  page,
}: {
  query: string;
  page: number;
}) => {
  const response = await axios.get("/search/movie", {
    params: {
      api_key: import.meta.env.VITE_API_KEY, // Переконайся, що в .env короткий ключ
      query,
      page,
      language: "en-US",
    },
  });
  return response.data.results;
};
