import type { FormEvent } from "react";
import toast from "react-hot-toast";
import styles from "./SearchBar.module.css";
// ...existing code...

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

const SearchBar = ({ onSubmit }: SearchBarProps) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const query = (form.elements.namedItem("query") as HTMLInputElement).value;

    if (query.trim() === "") {
      toast.error("Please enter your search query."); // Вимога з ТЗ
      return;
    }

    onSubmit(query);
    form.reset();
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
          id="powered-by"
          aria-label="Powered by The Movie Database"
        >
          Powered by TMDB
        </a>
        <form
          className={styles.form}
          onSubmit={handleSubmit}
          role="search"
          aria-label="Search movies"
          aria-describedby="powered-by"
        >
          {/* <label htmlFor="query" className={styles.srOnly}>
            Search movies
          </label> */}
          <input
            id="query"
            className={styles.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            aria-label="Search movies"
            aria-describedby="powered-by"
            autoFocus
          />
          <button className={styles.button} type="submit" aria-label="Search">
            Search
          </button>
        </form>
      </div>
    </header>
  );
};

export default SearchBar;
