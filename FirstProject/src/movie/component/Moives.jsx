import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./Movies.module.css";

function Movie({ id, coverImg, title, summary, genres, rating }) {
  return (
    <div>
      <div className={styles.moviebox}>
        <div className={styles.moviebox__imgbox}>
          <Link to={`/movie/${id}`}>
            <img
              src={coverImg}
              alt={title}
              className={styles.moviebox__imgbox__img}
            />
            <span
              className={styles.moviebox__imgbox__rating}
            >{`★${rating}/10`}</span>
          </Link>
        </div>
        <div className={styles.moviebox__textbox}>
          <h2>{title}</h2>
          <p>
            {summary.length > 300 ? `${summary.slice(0, 300)}...` : summary}
          </p>
          <ul>
            {genres.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  coverImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Movie;
