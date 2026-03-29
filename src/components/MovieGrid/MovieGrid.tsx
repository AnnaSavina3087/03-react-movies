import type { FC, KeyboardEvent } from "react";
import type { Movie } from "../../types/movie";
import styles from "./MovieGrid.module.css";
// ...existing code...

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

const MovieGrid: FC<MovieGridProps> = ({ movies, onSelect }) => {
  const handleKey = (e: KeyboardEvent<HTMLLIElement>, movie: Movie) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect(movie);
    }
  };

  return (
    <ul className={styles.grid}>
      {movies.map((movie) => (
        <li
          key={movie.id}
          className={styles.item}
          onClick={() => onSelect(movie)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => handleKey(e, movie)}
          aria-label={`Open details for ${movie.title ?? "movie"}`}
        >
          <div className={styles.card}>
            <img
              className={styles.image}
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "https://placehold.co/500x750?text=No+Poster"
              }
              alt={movie.title ?? "Movie poster"}
            />
            <div className={styles.info}>
              <h2 className={styles.title}>{movie.title}</h2>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MovieGrid;
