import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import SearchBar from "./components/SearchBar/SearchBar";
import MovieGrid from "./components/MovieGrid/MovieGrid";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import MovieModal from "./components/MovieModal/MovieModal";
import { fetchMovies } from "./services/api";
import type { Movie } from "./types/movie";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  // 🔍 Новий пошук
  const handleSearch = (newQuery: string) => {
    if (newQuery === query) return;

    setSelectedMovie(null); // 👈 закриваємо модалку
    setQuery(newQuery);
    setMovies([]);
    setPage(1);
    setIsError(false);
  };

  // 🎬 Завантаження фільмів
  useEffect(() => {
    if (!query) return;

    const getMovies = async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        const data = await fetchMovies(query, page);

        if (data.length === 0 && page === 1) {
          setMovies([]); // 👈 гарантуємо очищення
          toast.error("No movies found for your request.");
          return;
        }

        setMovies((prev) => [...prev, ...data]);
      } catch (error) {
        setIsError(true);
        toast.error("Whoops, something went wrong!");
      } finally {
        setIsLoading(false);
      }
    };

    getMovies();
  }, [query, page]);

  // 🎥 Модалка
  const openModal = (movie: Movie) => {
    // 👇 захист від подвійного відкриття
    if (selectedMovie?.id === movie.id) return;

    setSelectedMovie(movie);
  };

  const closeModal = () => setSelectedMovie(null);

  return (
    <div>
      <Toaster position="top-right" />

      <SearchBar onSubmit={handleSearch} />

      {/* ❌ Помилка */}
      {isError && <ErrorMessage />}

      {/* 🎬 Список фільмів */}
      {movies.length > 0 && <MovieGrid movies={movies} onSelect={openModal} />}

      {/* ⏳ Лоадер */}
      {isLoading && <Loader />}

      {/* 🎥 Модалка */}
      <MovieModal movie={selectedMovie} onClose={closeModal} />
    </div>
  );
}

export default App;
