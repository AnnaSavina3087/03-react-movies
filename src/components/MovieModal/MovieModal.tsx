import Modal from "react-modal";
import type { FC } from "react";
import type { Movie } from "../../types/movie";
import styles from "./MovieModal.module.css";

interface MovieModalProps {
  movie: Movie | null;
  onClose: () => void;
}

const MovieModal: FC<MovieModalProps> = ({ movie, onClose }) => {
  return (
    <Modal
      isOpen={Boolean(movie)}
      onRequestClose={onClose}
      className={styles.modal}
      overlayClassName={styles.backdrop}
      shouldCloseOnOverlayClick={true}
    >
      {movie && (
        <div className={styles.content}>
          <button className={styles.closeBtn} onClick={onClose}>
            ×
          </button>

          <img
            className={styles.image}
            src={
              movie.backdrop_path || movie.poster_path
                ? `https://image.tmdb.org/t/p/w780${
                    movie.backdrop_path ?? movie.poster_path
                  }`
                : "https://placehold.co/780x440?text=No+Image"
            }
            alt={movie.title ?? "Movie image"}
          />

          <div className={styles.info}>
            <h2 className={styles.title}>{movie.title}</h2>

            <p className={styles.overview}>
              {movie.overview || "No description available."}
            </p>

            <p className={styles.rating}>
              <strong>Rating:</strong>{" "}
              {movie.vote_average != null
                ? movie.vote_average.toFixed(1)
                : "N/A"}{" "}
              / 10
            </p>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default MovieModal;
