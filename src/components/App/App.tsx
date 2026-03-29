import { useState, useEffect } from "react";
import type { FC } from "react";
import Modal from "react-modal";
import toast, { Toaster } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";

Modal.setAppElement("#root");

const App: FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = (newQuery: string) => {
    if (newQuery === query) return;
    setQuery(newQuery);
    setMovies([]);
    setPage(1);
    setIsError(false);
  };

  useEffect(() => {
    if (!query) return;

    const getMovies = async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        const data = await fetchMovies({ query, page });

        if (Array.isArray(data) && data.length === 0 && page === 1) {
          toast.error("No movies found.");
          return;
        }

        setMovies((prev) => [...prev, ...data]);
      } catch {
        setIsError(true);
        toast.error("Error fetching movies!");
      } finally {
        setIsLoading(false);
      }
    };

    getMovies();
  }, [query, page]);

  // Закрити модалку по Escape — додає контекст взаємодії з клавіатури
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedMovie(null);
      }
    };

    if (selectedMovie) {
      window.addEventListener("keydown", handleKey);
      return () => window.removeEventListener("keydown", handleKey);
    }
  }, [selectedMovie]);

  return (
    <div>
      <Toaster position="top-right" />
      {/* <a className="sr-only" href="#main">
        Skip to content
      </a> */}

      <SearchBar onSubmit={handleSearch} />

      <main id="main" role="main" aria-live="polite" aria-busy={isLoading}>
        {isError && <ErrorMessage />}

        {movies.length > 0 && (
          <MovieGrid movies={movies} onSelect={setSelectedMovie} />
        )}

        {isLoading && <Loader />}
      </main>

      <MovieModal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />
    </div>
  );
};

export default App;
